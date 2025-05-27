import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are not properly configured');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Upload a file to Supabase Storage
   * @param file - The file buffer to upload
   * @param bucket - The storage bucket name
   * @param path - The path within the bucket
   * @param fileName - The name of the file
   * @returns The URL of the uploaded file
   */
  async uploadFile(
    file: Buffer,
    bucket: string,
    path: string,
    fileName: string,
  ): Promise<string> {
    // Generate a unique file name to avoid collisions
    const uniqueFileName = `${Date.now()}_${fileName}`;
    const fullPath = path ? `${path}/${uniqueFileName}` : uniqueFileName;

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    // Get the public URL for the uploaded file
    const { data: urlData } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath);

    return urlData.publicUrl;
  }

  /**
   * Delete a file from Supabase Storage
   * @param bucket - The storage bucket name
   * @param path - The full path to the file including filename
   */
  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await this.supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }
}

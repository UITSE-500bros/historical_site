import { createClient } from "@supabase/supabase-js";

class S3BucketConfig {
    private supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string)
    
    async uploadFile(file: File) {
        const { data, error } = await this.supabase.storage
            .from(process.env.S3_BUCKET_NAME as string)
            .upload(file.name, file)

        if (error) {
            throw error
        }

        return data
    }
    
}

export default S3BucketConfig;
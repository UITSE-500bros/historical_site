#!/bin/bash

# Define the folder structure
folders=(
  "src/components"
  "src/features"
  "src/hooks"
  "src/lib"
  "src/styles"
  "src/types"
  "src/constants"
  "src/services"
  "src/store"
)

# Create each folder and add a .gitkeep file
for folder in "${folders[@]}"; do
  mkdir -p "$folder"
  touch "$folder/.gitkeep"
  echo "Created: $folder/.gitkeep"
done

echo "✅ Folder structure with .gitkeep files created successfully."

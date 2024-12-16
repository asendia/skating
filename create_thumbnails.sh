#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <input_dir> <output_dir>"
    exit 1
fi

INPUT_DIR=$1
OUTPUT_DIR=$2

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through all .webp files in the input directory
for img in "$INPUT_DIR"/*.webp; do
    # Get the base name of the image file
    base_name=$(basename "$img")
    # Resize the image to 300x300 pixels and save it to the output directory
    magick "$img" -resize 300x300^ -gravity center -extent 300x300 "$OUTPUT_DIR/$base_name"
done

echo "Resizing completed. Resized images are in $OUTPUT_DIR"

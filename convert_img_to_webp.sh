#!/bin/bash

# Directory containing JPG images
INPUT_DIR=$1

# Check if directory is provided
if [ -z "$INPUT_DIR" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

# Convert each JPG and PNG file to WebP
for img in "$INPUT_DIR"/*.{jpg,png}; do
  if [ -f "$img" ]; then
    if [[ "$img" == *.jpg ]]; then
      webp_img="${img%.jpg}.webp"
    elif [[ "$img" == *.png ]]; then
      webp_img="${img%.png}.webp"
    fi
    cwebp "$img" -o "$webp_img"
    echo "Converted $img to $webp_img"
  fi
done

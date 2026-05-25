#!/bin/bash


# Check if at least one argument is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <arg1> <arg2> ..."
  exit 1
fi

# Access the first argument passed to the script
message="$*"
# echo -e "your message: ${yellow}${message}${reset}"

# ANSI color codes
# Set the foreground color to yellow
yellow=$(tput setaf 3)
# Reset the color
reset=$(tput sgr0)

value="main"
echo -e "${yellow}${value}${reset}"

git add .
git commit -m "${message}"
git push

value="build"
echo -e "${yellow}${value}${reset}"
cd ${value}

git add .
git commit -m "${message}"
git push

cd ..
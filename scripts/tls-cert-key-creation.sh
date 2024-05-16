#!/bin/bash

SCRIPT_DIR="$(dirname $0)"
cd "${SCRIPT_DIR}/.."
ROOT_PROJECT="$(pwd)"

TLS_DIR="${ROOT_PROJECT}/scripts/tls-dev"
CERT_FILE="certificate.crt"
KEY_FILE="private.key"

print_help() {
  echo "Usage: $0 [--create | --reset | --help]"
  echo "Create or reset private key and certification for tls protocol"
  echo ""
  echo "--create: Creates tls private key and certification in 'tls-dev' folder"
  echo "--reset: Recreate tls private key and certification in 'tls-dev' folder"
}

create_key_and_cert() {
  if [[ ! -d "$TLS_DIR" ]]; then
    mkdir -p "$TLS_DIR"
  fi
  cd "$TLS_DIR"
  openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout "$KEY_FILE" -out "$CERT_FILE"
  echo ""
  echo "TLS key and cert created successfully !"
}

if [[ "$1" == "--help" ]]; then
  print_help
  exit 0

elif [[ "$1" == "--create" ]]; then
  if [[ -f "$TLS_DIR/$CERT_FILE" && -f "$TLS_DIR/$KEY_FILE" ]]; then
    echo "You have had created private key and certificate already. Reset them by using --reset"
    exit 1
  else
    create_key_and_cert
  fi

elif [[ "$1" == '--reset' ]]; then
  if [[ ! -d "$TLS_DIR" ]]; then
    echo "You haven't created private key and certificate yet. Use --create to create them."
    exit 1
  else
    rm -f "$TLS_DIR/$CERT_FILE" "$TLS_DIR/$KEY_FILE"
    create_key_and_cert
    echo ""
    echo "TLS key and cert have been reset successfully !"
  fi

else
  echo "Invalid argument. Use '--help' for usage information."
  exit 1
fi
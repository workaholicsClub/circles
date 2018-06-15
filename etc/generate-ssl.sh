#!/usr/bin/env bash

# Specify where we will install
# the xip.io certificate
SSL_DIR="ssl"

# Set the wildcarded domain
# we want to use
DOMAIN="*.xip.io"

# A blank passphrase
PASSPHRASE=""

# Set our CSR variables
SUBJ="
C=RU
ST=Moscow
O=Circles
L=Moscow
CN=$DOMAIN
OU=IT
"

# Create our SSL directory
# in case it doesn't exist
sudo mkdir -p "$SSL_DIR"

# Generate our Private Key, CSR and Certificate
sudo openssl genrsa -out "$SSL_DIR/xip.io.key" 2048
sudo openssl req -new -subj "$(echo -n "$SUBJ" | tr "\n" "/")" -key "$SSL_DIR/xip.io.key" -out "$SSL_DIR/xip.io.csr" -passin pass:$PASSPHRASE
sudo openssl x509 -req -days 365 -in "$SSL_DIR/xip.io.csr" -signkey "$SSL_DIR/xip.io.key" -out "$SSL_DIR/xip.io.crt"

# Extracting the public key from an RSA keypair
openssl rsa -pubout -in "$SSL_DIR/xip.io.key" -out "$SSL_DIR/xip.io.pub"

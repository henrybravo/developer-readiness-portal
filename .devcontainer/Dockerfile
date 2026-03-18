FROM mcr.microsoft.com/devcontainers/python:1-3.12-bookworm

# Remove stale Yarn Classic apt repository and GPG key.
# The Yarn GPG key (62D54FD4003F6525) periodically expires, causing apt-get
# update to fail during dev container feature installation (exit code 100).
# Stripping it here ensures features like docker-in-docker install reliably.
RUN rm -f /etc/apt/sources.list.d/yarn.list \
    && rm -f /usr/share/keyrings/yarn-keyring.gpg \
    && apt-get update && apt-get -y upgrade && apt-get clean -y

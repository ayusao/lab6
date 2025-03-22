# Use Python lightweight image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy all files
COPY . /app

# Expose the port
EXPOSE 8000

# Run a simple HTTP server
CMD ["python", "-m", "http.server", "8000"]

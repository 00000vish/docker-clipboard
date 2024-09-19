# docker-clipboard

Docker image that spins up a simple webpage to paste and copy text from. 

# Docker Run

```
docker run -e PORT=3000 -p 3000:3000 00000vish/docker-clipboard:latest
```

# Docker Compose

```
services:
  docker-clipboard:
    image: 00000vish/docker-clipboard:latest
    container_name: docker-clipboard
    environment:
      - PORT=3000
    ports:
      - 3000:3000
  restart: unless-stopped
```

# Screenshot

![Screenshot](https://github.com/user-attachments/assets/553b0a4f-4a05-47c9-9b69-85acdfb4674d)

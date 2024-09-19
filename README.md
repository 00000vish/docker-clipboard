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

![Screenshot](https://github.com/00000vish/docker-whats-my-ip/assets/11762008/8c549f64-ada4-435c-944a-29e55038d228)

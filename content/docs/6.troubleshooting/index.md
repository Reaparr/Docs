---
title: Troubleshooting
description: Step-by-step guide to debug and resolve common issues with Reaparr
---

# Troubleshooting

This guide will help you diagnose and resolve issues with Reaparr. Follow these steps systematically to identify and fix problems.

## General Debugging Steps

### 1. Check System Requirements

Before troubleshooting, ensure your system meets the minimum requirements:

- **Docker**: Version 20.10 or higher
- **CPU**: Modern multi-core processor
- **RAM**: Minimum 2GB available
- **Storage**: Adequate space for downloads and database
- **Network**: Stable internet connection

### 2. Verify Container Status

Check if the Reaparr container is running:

```bash
docker ps -a | grep reaparr
```

If the container is not running or constantly restarting:

```bash
# Check container logs
docker logs reaparr

# Check last 100 lines
docker logs --tail 100 reaparr

# Follow logs in real-time
docker logs -f reaparr
```

### 3. Review Log Files

Logs are your best friend when debugging. They contain detailed information about what's happening.

**Log Location**: `/Config/Logs` (inside container) or your mapped host directory

```bash
# If using Docker, access logs from host
cd /path/to/your/config/Logs

# View the latest log file
tail -f reaparr.log

# Search for errors
grep -i "error" reaparr.log
grep -i "exception" reaparr.log
grep -i "failed" reaparr.log
```

**What to look for in logs**:
- Error messages with stack traces
- Failed authentication attempts
- Network connection issues
- Permission denied errors
- Database errors

### 4. Check Configuration Files

Verify your configuration is correct:

```bash
# Check ReaparrSettings.json
cat /path/to/config/ReaparrSettings.json

# Validate JSON syntax
python -m json.tool /path/to/config/ReaparrSettings.json
```

Common configuration issues:
- Invalid JSON syntax
- Incorrect file paths
- Wrong port numbers
- Invalid Plex credentials

### 5. Verify Network Connectivity

Test network access to Plex servers:

```bash
# Test connectivity to Plex
curl -I https://plex.tv

# Test connectivity to your Plex server
curl -I http://your-plex-server:32400

# Check DNS resolution
nslookup plex.tv
```

### 6. Check File Permissions

Permission issues are common with Docker containers:

```bash
# Check ownership of config directory
ls -la /path/to/your/config

# Check ownership of download directory
ls -la /path/to/your/downloads

# Fix permissions if needed (replace PUID:PGID with your values)
sudo chown -R 1000:1000 /path/to/your/config
sudo chown -R 1000:1000 /path/to/your/downloads
sudo chmod -R 755 /path/to/your/downloads
```

## Common Issues and Solutions

### Cannot Access Web Interface

**Symptoms**: Unable to reach Reaparr at `http://localhost:7000`

**Solutions**:

1. **Check if container is running**:
   ```bash
   docker ps | grep reaparr
   ```

2. **Verify port mapping**:
   ```bash
   docker port reaparr
   ```
   Should show: `7000/tcp -> 0.0.0.0:7000`

3. **Check firewall**:
   ```bash
   # Linux - check if port is open
   sudo ufw status
   sudo ufw allow 7000
   
   # Check if something else is using the port
   sudo netstat -tuln | grep 7000
   ```

4. **Test from inside container**:
   ```bash
   docker exec -it reaparr curl http://localhost:7000
   ```

5. **Try different browser**: Some extensions (ad blockers, Dark Reader) can interfere

### Downloads Not Starting

**Symptoms**: Downloads stuck in queue or not starting

**Debugging Steps**:

1. **Check Plex account connection**:
   - Go to Settings → Plex Accounts
   - Verify account shows as "Connected"
   - Check token is valid

2. **Verify server accessibility**:
   - Ensure Plex server is online
   - Check server shows as "Available" in Reaparr
   - Test server connection manually

3. **Review download settings**:
   - Check download location is valid
   - Verify download limits aren't reached
   - Ensure bandwidth limits aren't too restrictive

4. **Check logs for errors**:
   ```bash
   docker logs reaparr | grep -i "download"
   ```

### Permission Denied Errors

**Symptoms**: 
- `Permission denied` errors in logs
- `Access to the path is denied`
- Files not being written

**Solution**:

1. **Check PUID/PGID environment variables**:
   ```bash
   docker inspect reaparr | grep -i puid
   docker inspect reaparr | grep -i pgid
   ```

2. **Find your user's PUID/PGID**:
   ```bash
   id your-username
   ```

3. **Update Docker configuration**:
   
   **Docker Compose**:
   ```yaml
   environment:
     - PUID=1000
     - PGID=1000
   ```
   
   **Docker CLI**:
   ```bash
   docker run -e PUID=1000 -e PGID=1000 ...
   ```

4. **Fix directory permissions**:
   ```bash
   sudo chown -R 1000:1000 /path/to/downloads
   sudo chmod -R 755 /path/to/downloads
   ```

5. **Restart container**:
   ```bash
   docker restart reaparr
   ```

### Authentication Issues

**Symptoms**: 
- Cannot login to Plex
- "Invalid credentials" errors
- Token authentication failing

**Solutions**:

1. **Verify Plex credentials**:
   - Ensure username/email and password are correct
   - Check if 2FA is enabled on Plex account

2. **Check username login setting**:
   - Go to [plex.tv](https://www.plex.tv/) → Settings → Account
   - Enable "Allow username to be used when signing in"

3. **Try authentication token method**:
   - Get your Plex token: [Finding X-Plex-Token](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/)
   - Use token instead of password

4. **Clear authentication cache**:
   ```bash
   # Stop container
   docker stop reaparr
   
   # Remove cached authentication (if exists)
   rm -f /path/to/config/auth-cache.json
   
   # Start container
   docker start reaparr
   ```

### Database Corruption

**Symptoms**:
- Reaparr won't start
- Database errors in logs
- Missing data after restart

**Solutions**:

1. **Backup current database**:
   ```bash
   cp /path/to/config/reaparr.db /path/to/config/reaparr.db.backup
   ```

2. **Check database integrity**:
   ```bash
   sqlite3 /path/to/config/reaparr.db "PRAGMA integrity_check;"
   ```

3. **Restore from backup** (if available):
   ```bash
   # Stop Reaparr
   docker stop reaparr
   
   # Restore backup
   cp /path/to/config/backups/reaparr.db /path/to/config/reaparr.db
   
   # Start Reaparr
   docker start reaparr
   ```

4. **Reset database** (last resort - loses all data):
   ```bash
   docker stop reaparr
   rm /path/to/config/reaparr.db
   docker start reaparr
   ```

### Slow Performance

**Symptoms**: 
- UI is sluggish
- Downloads are slow
- High CPU/RAM usage

**Debugging Steps**:

1. **Check resource usage**:
   ```bash
   docker stats reaparr
   ```

2. **Review concurrent downloads**:
   - Reduce number of simultaneous downloads
   - Lower download speed limits

3. **Check disk I/O**:
   ```bash
   iostat -x 1
   ```

4. **Monitor network**:
   ```bash
   # Check bandwidth usage
   iftop
   ```

5. **Review system load**:
   ```bash
   htop
   ```

### Images Not Loading

**Symptoms**: Poster images not showing in library view

**Solutions**:

1. **Verify Plex server is online**: Images are loaded directly from Plex server

2. **Disable browser extensions**:
   - Disable ad blockers (uBlock Origin, AdBlock)
   - Disable Dark Reader
   - Disable privacy extensions

3. **Check browser console**:
   - Press F12 to open developer tools
   - Check Console tab for errors
   - Check Network tab for failed requests

4. **Test in different browser**: Try Chrome/Firefox without extensions

5. **Check HTTPS/HTTP issues**:
   - Firefox may block non-HTTPS connections
   - Mixed content warnings in browser console

### Container Won't Start

**Symptoms**: Container starts then immediately stops

**Debugging Steps**:

1. **Check logs immediately**:
   ```bash
   docker logs reaparr
   ```

2. **Common causes**:
   - Port already in use
   - Invalid volume mounts
   - Corrupted configuration
   - Missing required environment variables

3. **Verify Docker setup**:
   ```bash
   # Check Docker version
   docker --version
   
   # Check Docker is running
   sudo systemctl status docker
   ```

4. **Test with minimal configuration**:
   ```bash
   docker run -d \
     --name reaparr-test \
     -p 7001:7000 \
     -v /tmp/reaparr-test:/Config \
     reaparr/reaparr:latest
   ```

5. **Check for conflicting containers**:
   ```bash
   docker ps -a
   ```

## Advanced Debugging

### Enable Debug Logging

For more detailed logs, enable debug mode:

1. Stop Reaparr
2. Edit `/Config/ReaparrSettings.json`
3. Set `"LogLevel": "Debug"`
4. Restart Reaparr

```json
{
  "LogLevel": "Debug",
  ...
}
```

### Inspect Docker Container

Get detailed container information:

```bash
# Full container inspection
docker inspect reaparr

# Check environment variables
docker inspect reaparr | grep -A 20 "Env"

# Check mounted volumes
docker inspect reaparr | grep -A 20 "Mounts"

# Check networking
docker inspect reaparr | grep -A 20 "Networks"
```

### Network Debugging

Test connectivity from inside the container:

```bash
# Enter container shell
docker exec -it reaparr sh

# Test DNS
nslookup plex.tv

# Test HTTP connectivity
wget -O- https://plex.tv

# Check open connections
netstat -an | grep ESTABLISHED
```

### Database Inspection

Inspect the Reaparr database:

```bash
# Open database
sqlite3 /path/to/config/reaparr.db

# List tables
.tables

# Check schema
.schema

# Query example
SELECT * FROM PlexServers;

# Exit
.quit
```

## Getting Help

If you've tried all the above steps and still have issues:

### 1. Gather Information

Before asking for help, collect:

- **Reaparr version**: Check in Settings → About
- **Docker version**: `docker --version`
- **Operating system**: `uname -a` (Linux) or system info
- **Docker compose file** or run command (remove sensitive data)
- **Relevant log excerpts** (last 50-100 lines)
- **Steps to reproduce** the issue

### 2. Search Existing Issues

Check if others have reported the same issue:
- [GitHub Issues](https://github.com/Reaparr/Reaparr/issues)
- [Discord Community](https://discord.com/invite/Qa3BtxN77g)

### 3. Create a Bug Report

If it's a new issue, create a detailed bug report:

1. Go to [GitHub Issues](https://github.com/Reaparr/Reaparr/issues/new)
2. Use the bug report template
3. Include all information gathered above
4. Be specific about what you expected vs what happened

### 4. Join the Community

Get real-time help:
- [Discord Server](https://discord.com/invite/Qa3BtxN77g)
- Be patient and respectful
- Provide all requested information

## Prevention Tips

### Regular Maintenance

1. **Keep Reaparr updated**: Pull latest Docker image regularly
2. **Monitor disk space**: Ensure adequate free space
3. **Review logs periodically**: Catch issues early
4. **Backup configuration**: Regularly backup `/Config` directory

### Backup Strategy

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/reaparr"
CONFIG_DIR="/path/to/config"

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/reaparr-config-$DATE.tar.gz" "$CONFIG_DIR"

# Keep only last 7 backups
ls -t "$BACKUP_DIR"/reaparr-config-*.tar.gz | tail -n +8 | xargs rm -f
```

### Monitoring

Set up basic monitoring:

```bash
# Check if Reaparr is responding
curl -f http://localhost:7000 || echo "Reaparr is down!"

# Monitor disk space
df -h /path/to/downloads

# Check log for errors
grep -i "error" /path/to/config/Logs/reaparr.log | tail -n 10
```

## Quick Reference

### Useful Commands

```bash
# View logs
docker logs -f reaparr

# Restart container
docker restart reaparr

# Check resource usage
docker stats reaparr

# Enter container
docker exec -it reaparr sh

# Update Reaparr
docker pull reaparr/reaparr:latest
docker stop reaparr
docker rm reaparr
# Run with same parameters
docker start reaparr
```

### Important File Locations

| Item | Container Path | Description |
|------|---------------|-------------|
| Configuration | `/Config` | Main config directory |
| Settings | `/Config/ReaparrSettings.json` | Application settings |
| Database | `/Config/reaparr.db` | SQLite database |
| Logs | `/Config/Logs` | Log files |
| Downloads | Varies | Your mapped download path |

### Common Error Messages

| Error | Likely Cause | Solution |
|-------|-------------|----------|
| `Permission denied` | Wrong PUID/PGID | Set correct PUID/PGID and fix file permissions |
| `Address already in use` | Port conflict | Change port mapping or stop conflicting service |
| `Connection refused` | Service not running | Check if Reaparr is running |
| `Invalid token` | Expired auth | Re-authenticate with Plex |
| `Database locked` | Multiple instances | Ensure only one Reaparr instance is running |
| `Disk full` | No storage space | Free up disk space |

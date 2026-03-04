### init

```bash
python3 -m venv venv
source venv/bin/activate

pip install mcp
```

### code init
```python
# server.py - filename

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-mcp-server")

if __name__ == "__main__":
    mcp.run()
```

```bash
pip intall mcp[cli]
mcp dev server.py

# if im using venv (inspector)
# command: /home/edibauer/Desktop/MCP/venv/bin/mcp
# arguments: run server.py

# IDE config
{
    "mcpServers": {
        "my-mcp-server": {
            "command": "/home/edibauer/Desktop/MCP/venv/bin/python",
            "args": [
                "/home/edibauer/Desktop/MCP/server.py"
            ]
        }
    }
}


```
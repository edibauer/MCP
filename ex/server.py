from mcp.server.fastmcp import FastMCP
from pathlib import Path

mcp = FastMCP("my-mcp-server")

@mcp.tool()
def sumar(a:int, b:int) -> int:
    """Suma dos enteros"""
    return a + b

@mcp.tool()
def analizar_archivo(archivo:Path) -> dict:
    """Dado el path de un archivo, analiza los metadatos del mismo"""
    path = Path(archivo)
    return {
        "nombre": path.name,
        "extension": path.suffix,
        "contenido": path.read_text(),
        "tamaño": path.stat().st_size,
        "fecha_creacion": path.stat().st_ctime
    }

if __name__ == "__main__":
    mcp.run()
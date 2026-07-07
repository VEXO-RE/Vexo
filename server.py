#!/usr/bin/env python3
import sys, json

print(json.dumps({"status":"ok","message":"Python MCP server iniciado"}), flush=True)

for line in sys.stdin:
    try:
        data = json.loads(line)
        response = {"status":"ok","output":f"Python recibió: {data}"}
        print(json.dumps(response), flush=True)
    except Exception as e:
        print(json.dumps({"status":"error","message":str(e)}), flush=True)

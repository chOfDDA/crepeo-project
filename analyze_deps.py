# analyze_deps.py
import os, re
from collections import defaultdict

def collect_files(root, exts=('.js','.vue')):
    out = []
    for dirpath, _, files in os.walk(root):
        if 'node_modules' in dirpath: continue
        for f in files:
            if f.endswith(exts):
                out.append(os.path.relpath(os.path.join(dirpath,f), root))
    return out

def build_graph(root, files):
    imports = defaultdict(set)
    for rel in files:
        path = os.path.join(root, rel)
        text = open(path, encoding='utf-8', errors='ignore').read()
        for imp in re.findall(r"(?:import.*?from\s*['\"](.+?)['\"]|require\(\s*['\"](.+?)['\"]\))", text):
            mod = imp[0] or imp[1]
            if mod.startswith('.'):
                src_dir = os.path.dirname(path)
                tgt = os.path.normpath(os.path.join(src_dir, mod))
                for ext in ['.js', '.vue', '/index.js', '/index.vue']:
                    cand = tgt + ext if not tgt.endswith(ext) else tgt
                    if os.path.exists(cand):
                        rel_t = os.path.relpath(cand, root)
                        imports[rel].add(rel_t)
                        break
    inbound = defaultdict(int)
    for src, tgts in imports.items():
        for t in tgts: inbound[t] += 1
    orphans = [f for f in files if inbound[f] == 0]
    return orphans

if __name__ == '__main__':
    root = os.getcwd()  # запускайте из корня, где лежит client/ и server/
    files = collect_files(root)
    orphans = build_graph(root, files)
    print("Найдены неиспользуемые файлы:")
    for f in orphans:
        print("  ", f)
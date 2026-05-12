import os
root=os.path.join(os.getcwd(),'public','images','Desarrollos')
dirs=['006_galatha-2026','007_huna-2026','008_livia-2026','009_maktub-2026','010_-nuan-2026','011_brochure','013-chapultepec-430-2026','014-magnolia-2026','015-marsala-2026','016-monumento-31-2026','017-merida-94-2026','018-vertice-2026','019-orquidea-2026','020-girasol-2026','021-blum-2026','023-Raph-2026','024-lirio-2026','025-salamanca-11-2026','026-Downtown Mayakoba1-2026']
for d in dirs:
    p=os.path.join(root,d)
    print('==',d,'==')
    if os.path.isdir(p):
        for f in sorted(os.listdir(p)):
            print(f)
    else:
        print('MISSING DIR')

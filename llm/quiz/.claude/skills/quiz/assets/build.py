#!/usr/bin/env python3
"""index.html + data/items.js (+ 그림) 을 파일 하나로 합친다.

    python3 build.py

산출물은 폴더 구조도 인터넷도 없이 어디서든 열린다. 파일 하나만 옮기면 되므로
상대 경로가 어긋날 여지가 없다. 이름은 data/items.js 의 SUBJECT.file 이 정한다.

SUBJECT.web 이 있으면 Artifact(웹 링크) 발행용본도 함께 만든다. 발행할 때
<!doctype>·<html>·<head>·<body> 껍데기가 자동으로 씌워지므로 그것을 걷어낸 알맹이다.

이 스크립트는 과목마다 고치지 않는다 — 고칠 일이 있으면 스킬 원본을 고친다.
"""
import base64, io, mimetypes, os, re, shutil, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(HERE, "index.html")
DATA = os.path.join(HERE, "data", "items.js")


def field(js, name, required=True):
    m = re.search(r'\b%s\s*:\s*"((?:[^"\\]|\\.)*)"' % name, js)
    if not m and required:
        sys.exit("data/items.js 의 SUBJECT 에 %s 가 없습니다." % name)
    return m.group(1) if m else None


def main():
    html = io.open(SRC, encoding="utf-8").read()
    items = io.open(DATA, encoding="utf-8").read()

    out_name = field(items, "file")
    web_name = field(items, "web", required=False)

    if "</script" in items:
        sys.exit("data/items.js 안에 </script 가 있습니다. 문자열을 쪼개 주세요.")

    # ── 그림을 data URI 로 심는다 ───────────────────────────────
    paths = sorted(set(re.findall(r'image:\s*"((?!data:)[^"]+)"', items)))
    for rel in paths:
        full = os.path.join(HERE, rel)
        if not os.path.exists(full):
            sys.exit("그림을 찾지 못했습니다: %s" % rel)
        mime = mimetypes.guess_type(full)[0] or "image/png"
        uri = "data:%s;base64," % mime + base64.b64encode(open(full, "rb").read()).decode()
        items = items.replace('"%s"' % rel, '"%s"' % uri)

    # module.exports 줄은 통째로 지운다 (정규식이 줄을 반쯤 자르면 문법 오류가 된다)
    items = re.sub(r'^.*typeof module.*$', '', items, flags=re.M)

    tag = '<script src="data/items.js"></script>'
    if tag not in html:
        sys.exit("index.html 에 %s 가 없습니다." % tag)
    single = html.replace(tag, "<script>\n" + items + "\n</script>")

    # 파일 하나로 도는지 여기서 못 박는다.
    if "<script src=" in single:
        left = [l.strip() for l in single.splitlines() if "<script src=" in l]
        sys.exit("산출물에 외부 스크립트가 남았습니다 — 파일 하나로 안 돕니다:\n  " + "\n  ".join(left))
    for rel in paths:
        if rel in single:
            sys.exit("산출물에 그림 경로 %s 가 남아 있습니다." % rel)

    check_syntax(single)
    for need in ("const ITEMS", "const UNITS", "const CATS", "const SUBJECT", "function home()"):
        if need not in single:
            sys.exit("'%s' 가 산출물에 없습니다." % need)

    out = os.path.join(HERE, out_name)
    io.open(out, "w", encoding="utf-8").write(single)
    print("%s — 그림 %d장 포함, %s bytes" % (out_name, len(paths), format(os.path.getsize(out), ",")))

    if web_name:
        write_web(single, os.path.join(HERE, web_name))


def check_syntax(single):
    """합친 결과가 실제로 실행 가능한지 본다. 여기가 없으면 데이터 오타가 빈 화면이 된다."""
    scripts = re.findall(r"<script>(.*?)</script>", single, flags=re.S)
    if len(scripts) < 2:
        sys.exit("script 블록을 찾지 못했습니다.")
    node = shutil.which("node") or shutil.which("bun")
    if not node:
        print("경고: node/bun 이 없어 문법 검사를 건너뜁니다.")
        return
    for n, code in enumerate(scripts, 1):
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
            f.write(code)
            tmp = f.name
        r = subprocess.run([node, "--check", tmp], capture_output=True, text=True)
        os.unlink(tmp)
        if r.returncode != 0:
            sys.exit("script 블록 %d 에 문법 오류가 있습니다:\n%s" % (n, r.stderr))
    print("문법 검사 통과 (script 블록 %d개)" % len(scripts))


def write_web(single, path):
    web = single
    for tag in ("<!doctype html>", '<html lang="ko">', "<head>", "</head>",
                "<body>", "</body>", "</html>"):
        web = web.replace(tag, "", 1)
    web = re.sub(r'<meta charset[^>]*>\n?', '', web, count=1)
    web = re.sub(r'<meta name="viewport"[^>]*>\n?', '', web, count=1)
    web = web.strip() + "\n"
    for banned in ("<!doctype", "<html", "<head>", "<body>"):
        if banned in web.lower():
            sys.exit("발행용본에 '%s' 가 남아 있습니다." % banned)
    for need in ("<title>", "const ITEMS", "function home()"):
        if need not in web:
            sys.exit("발행용본에 '%s' 가 없습니다." % need)
    io.open(path, "w", encoding="utf-8").write(web)
    print("%s — 웹 발행용, %s bytes" % (os.path.basename(path), format(os.path.getsize(path), ",")))


if __name__ == "__main__":
    main()

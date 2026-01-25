
import re
import sys
import os

def clean_gemini_file(input_path):
    if not os.path.exists(input_path):
        print(f"Error: File not found - {input_path}")
        return

    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()

    print(f"Processing: {input_path} ({len(content)} bytes)")

    # 1. '안전 구역(Safe Zone)' 자동 탐지
    # 특정 텍스트("중국 권력...") 대신, Gemini 대화의 핵심 태그인 <message-content> 위치를 찾습니다.
    # 이 태그가 있는 위치를 기준으로, 이 내용을 감싸고 있는 부모 태그는 지우지 않도록 합니다.
    anchor_search = re.search(r'<message-content', content)
    if not anchor_search:
        # 만약 message-content가 없다면 main 태그를 찾습니다.
        anchor_search = re.search(r'<main', content)
    
    if anchor_search:
        safe_pos = anchor_search.start()
        print(f"Detected content anchor at position: {safe_pos}")
    else:
        print("Warning: Could not detect main content area. Using middle of file as heuristic.")
        safe_pos = len(content) // 2

    # 2. 태그 안전 삭제 함수
    def remove_safe_tag(html, tag_name, safe_pos):
        start_marker = f"<{tag_name}"
        end_marker = f"</{tag_name}>"
        
        # 태그가 중첩되지 않는다는 가정하에 작동하는 심플한 로직입니다.
        # Gemini의 사이드바/입력창은 보통 중첩되지 않아 이 방식이 유효합니다.
        pattern = re.compile(f"{start_marker}.*?{end_marker}", re.DOTALL)
        
        def replacer(match):
            start = match.start()
            end = match.end()
            # 만약 태그 범위 안에 우리의 '안전 구역(safe_pos)'이 포함되어 있다면? -> 지우면 안 됨 (부모 태그임)
            if start < safe_pos < end:
                print(f"  [KEEP] {tag_name} wraps content (Position {start}-{end})")
                return match.group(0)
            else:
                # 안전 구역 밖이라면 -> 지워도 됨 (사이드바 등)
                print(f"  [REMOVE] {tag_name} (Position {start}-{end})")
                return "" 
                
        return pattern.sub(replacer, html)

    # 3. 삭제할 타겟들 (사이드바, 입력창 등)
    targets = ["bard-sidenav", "side-navigation-v2", "input-area-v2", "bottom-bar"]
    
    new_content = content
    for target in targets:
        new_content = remove_safe_tag(new_content, target, safe_pos)

    # 4. 전체 화면 CSS 주입
    css = """
    <style>
        /* 강제 전체 화면 및 불필요한 여백 제거 */
        bard-sidenav-container, side-navigation-v2, main, .conversation-container {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        
        /* 혹시 남아있을지 모를 사이드바 요소 숨기기 */
        .sidenav, .sidebar, [role="navigation"], .bottom-bar {
            display: none !important;
        }
        
        /* 스크롤 허용 */
        body, html {
            overflow-y: auto !important;
            /* background-color removed to keep original theme */
        }
        
        /* 텍스트 가독성을 위해 중앙 정렬하되 꽉 차게 */
        message-content {
            max-width: 1200px !important; /* 너무 길어지면 읽기 힘드므로 적당한 제한 */
            margin: 0 auto !important;
            display: block !important;
            padding: 40px 20px !important;
        }
    </style>
    """
    
    if "</head>" in new_content:
        new_content = new_content.replace("</head>", f"{css}\n</head>")
    else:
        new_content += css

    # 5. 저장
    filename, ext = os.path.splitext(input_path)
    output_path = f"{filename}_clean{ext}"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print(f"Success! Created: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        clean_gemini_file(sys.argv[1])
    else:
        print("Usage: python clean_gemini.py <html_file_path>")

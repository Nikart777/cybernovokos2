from pathlib import Path
import json, hashlib, shutil
from zipfile import ZipFile
from lxml import etree
from pypdf import PdfReader

work=Path(__file__).resolve().parent
out=Path(r'C:\Users\avtos\YandexDisk\CYBERX\Клуб3\Инженерные проекты\00_Передача_новой_сессии_2026-10-02')
pdf=work/'render'/'handoff.pdf'
docx=out/'Клуб3_Задание_АР_ЭОМ_ОВ_для_новой_сессии.docx'
reader=PdfReader(str(pdf))
texts=[pg.extract_text() or '' for pg in reader.pages]
assert len(texts)==27,len(texts)
assert all(len(t.strip())>200 for t in texts)
full='\n'.join(texts)
for required in ['40 кВт','144','137,904','21.101-2026','IN-01','ЭОМ-17','ОВ.СМ','АР-08']:
    assert required in full,required
assert 'turn145' not in full and 'cite' not in full
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(docx) as z:
    root=etree.fromstring(z.read('word/document.xml'))
    styles=etree.fromstring(z.read('word/styles.xml'))
    assert not styles.xpath('//w:pBdr',namespaces=ns)
    table_count=len(root.xpath('//w:tbl',namespaces=ns))
    link_count=len(root.xpath('//w:hyperlink',namespaces=ns))
    assert table_count==8
    assert link_count>40
reg=json.loads((out/'deliverables-register.json').read_text(encoding='utf-8'))
assert [len(reg[x]) for x in ['EOM','OV','AR','EOM_calculations']]==[18,12,8,12]
manifest=json.loads((out/'manifest.json').read_text(encoding='utf-8'))
missing=[x['path'] for x in manifest['sourceModel'].values() if not Path(x['path']).exists()]
assert not missing,missing
assert manifest['allocatedPower']['kW']==40
published_pdf=out/'Клуб3_Задание_АР_ЭОМ_ОВ_для_новой_сессии.pdf'
shutil.copy2(pdf,published_pdf)
qa={'status':'PASS','pages':27,'renderer':'Microsoft Word COM; packaged render_docx could not find soffice.exe; no LibreOffice installed or used','visualInspection':'All 27 pages inspected via PNG; final cosmetic removal of title rule rechecked on page 1','tables':table_count,'hyperlinks':link_count,'deliverables':{'EOM_groups':18,'OV_groups':12,'AR_groups':8,'EOM_calculations':12},'sourcePathsExist':True,'archicadModifiedByThisTask':False,'modelAudit':'Counts/paths/40 kW checked against model-audit.json; PS VIP ceiling-mounted warm contour retained in instructions.'}
(out/'verification.json').write_text(json.dumps(qa,ensure_ascii=False,indent=2),encoding='utf-8')
manifest['bundleFiles']={}
for f in out.iterdir():
    if f.is_file() and f.name!='manifest.json':
        manifest['bundleFiles'][f.name]={'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()}
manifest['qualityCheck']=qa
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'status':'PASS','pages':len(texts),'links':link_count,'files':len(manifest['bundleFiles'])+1},ensure_ascii=False))

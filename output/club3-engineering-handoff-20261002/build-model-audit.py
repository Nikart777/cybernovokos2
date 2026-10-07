import json
from pathlib import Path
from datetime import datetime
from collections import Counter, defaultdict

OUT = Path(__file__).resolve().parent
ROOT = Path(r'C:\Users\avtos\.codex\integrations\archicad26')
ACTIVE = ROOT / 'club3-plan' / 'active-layout.json'
def read(p):
    return json.loads(Path(p).read_text(encoding='utf-8-sig'))
active = read(ACTIVE)
layout = read(active['spec'])
equipment = read(active['equipmentSpec'])
electrical = read(active['electricalPointsSpec'])
ej = read(active['equipmentJournal'])
fj = read(active['furnitureJournal'])
snap = read(active['latestModelSnapshot'])
state = read(active['status'])
verification = read(active['verification'])
measurements = read(active['measurementSource'])
native = {e['elementId']['guid']:d for e,d in zip(snap['elements'],snap['details']['detailsOfElements'])}
gdlpath = Path(active['latestModelSnapshot']).with_name('after-gdl.json')
counts = equipment['counts']

def compact_object(o):
    return {k:o[k] for k in ('key','kind','library','room','source_guid','position','dimensions','angle') if k in o}

def furniture_ref(key):
    o=fj['objects'][key]
    guid=o['result']['elementId']['guid']
    d=native[guid]
    return {'key':key,'guid':guid,'nativeType':d['type'],'layerIndex':d['layerIndex'],
            'library':d['details'].get('libPart',{}).get('name'),
            'origin':d['details'].get('origin'),'dimensions':d['details'].get('dimensions')}

points=electrical['points']
assert len(points)==41 and sum(p['outletCount'] for p in points)==144
assert len(layout['workstations'])==26
assert len(equipment['neonSegments'])==62
assert len(equipment['lamps'])==15
assert all(p['source_guid'] in native for p in points)
assert len({p['source_guid'] for p in points})==41
assert all(o['source_guid'] in native for o in equipment['objects'])

neon=equipment['neonSegments']
by_color=defaultdict(lambda:{'segments':0,'length_m':0.0})
by_zone=defaultdict(lambda:{'segments':0,'length_m':0.0})
for n in neon:
    for mapping,key in ((by_color,n['color']),(by_zone,n['zone'])):
        mapping[key]['segments']+=1
        mapping[key]['length_m']+=n['length_m']
for mapping in (by_color,by_zone):
    for v in mapping.values():v['length_m']=round(v['length_m'],9)

samples=[]
for guid,d in native.items():
    if d['layerIndex']==46:
        samples.append({'guid':guid,'type':d['type'],'library':d['details'].get('libPart',{}).get('name')})

artifacts={}
for key,path in active.items():
    if isinstance(path,str) and Path(path).is_file():
        p=Path(path); st=p.stat()
        artifacts[key]={'path':str(p),'sizeBytes':st.st_size,'modifiedLocal':datetime.fromtimestamp(st.st_mtime).isoformat()}
artifacts['activeManifest']={'path':str(ACTIVE),'role':'Current pointer; re-read at the next session start.'}
artifacts['nativeGdlParameters']={'path':str(gdlpath),'sizeBytes':gdlpath.stat().st_size,
    'role':'Full object/lamp/door parameter readback. Large file: parse selectively, do not print in full.'}
artifacts['preProjectionFullVerification']={'path':str(ROOT/'club3-plan'/'remeasure-20261002'/'verification.json'),
    'role':'Earlier full measured-plan consistency audit; combine with latest projection delta audit, not a design-code compliance certificate.'}

result={
 'schema':'cyberx.engineering-handoff-model-audit.v1',
 'createdAt':datetime.now().isoformat(),
 'auditMode':'OFFLINE_READ_ONLY; no Archicad API calls; no changes to project or active manifest',
 'project':snap['project'],
 'authoritativeArtifacts':artifacts,
 'sourcePriority':[
  'At next session start, inspect the actual open project and any user edits first, then confirm the current PLN path.',
  'The saved active PLN and a fresh native snapshot are the engineering/BIM source; active-layout.json points to the last synchronized exports.',
  'Current JSON exports map GUIDs to semantic equipment. They support planning; do not replay old journals as scripts.',
  'PNG, previous variants, original sketches and older journals are references only. Do not rebuild the current project from a PNG or old variant.'
 ],
 'lastSave':state.get('save'),
 'lastGeometryVerification':{'path':active['verification'],'status':verification['status'],
    'scope':'Requested 37x40 cm projection, slab contours, neon detour and unchanged retained equipment; geometric check only.'},
 'modelCounts':{
   'nativeElements':len(snap['elements']),
   'nativeTypes':dict(Counter(d['type'] for d in native.values())),
   'gamingWorkstations':26,'gamingAllocation':{'solo':5,'duo':6,'bootcamp':5,'commonHall':10},
   'adminWorkstations':1,'racingSimulators':4,'simulatorScreenInches':55,
   'simulatorComputerTowers':4,'consoleStations':2,'consoleScreenInches':65,
   'receptionScreens':2,'receptionScreenInches':32,
   'activeDrinksFridges':1,'reservedSecondFridgeSocket':1,
   'socketBlocks':41,'individualSocketOutlets':144,
   'gamingSocketBlocks':26,'gamingSocketOutlets':104,
   'simulatorSocketBlocks':4,'simulatorSocketOutlets':16,
   'consoleSocketBlocks':2,'consoleSocketOutlets':8,
   'receptionSocketBlocks':9,'receptionSocketOutlets':16,
   'nativeLuminaires':15,'genericCeilingLuminaires':10,'graffitiSpots':1,'receptionPendants':4,
   'neonSegments':62,'wifiAccessPoints':1,
   'warning':'Do not count old samples on layer46. Computer towers inside custom rack/simulator GDL parts are not separate native objects.'
 },
 'rooms':[{k:r.get(k) for k in ('key','name','source_guid','size_m','area_m2','pc','polygon')} for r in layout['rooms']],
 'equipmentPlacement':{
   'workstations':layout['workstations'],
   'deskSize_m':[1.10,0.85,0.75],
   'towerArrangement':{
      'soloAndDuo':'11 towers on wall shelves; tower base/support top z=1.70 m. Shelf object base z=1.45 m and height0.25 m.',
      'bootcamp':'One-sided five-computer metal rack; room width5.60 m, desk row5.50 m; 40 mm tube was intended (not40 cm).',
      'commonHall':'One double-sided ten-computer metal rack; two opposed rows of five desks.',
      'simulators':'Towers at floor level near TVs; four socket outlets per simulator behind screen.'
   },
   'selectedEquipmentRefs':[compact_object(o) for o in equipment['objects'] if o['kind'] not in ('neon','wall_socket','quad_socket')],
   'furnitureRefs':[furniture_ref(k) for k in ('hall_pc_rack','ps_vip/tv','ps_vip/sofa','ps_standard/sofa','admin/monitor','admin/pc_chair','reception','simulator_01','simulator_02','simulator_03','simulator_04')],
   'fridge':equipment['drinksFridge'],
   'fridgeSecond':'Only reserved outlet R05. A second70 cm fridge does not fit next to the modeled unit; location/model must be resolved.',
   'smallAppliances':'Kettle, coffee machine, microwave confirmed by user; outlet positions present, physical appliance bodies and actual ratings not selected.'
 },
 'lighting':{
   'nativeLuminaires':equipment['lamps'],
   'pendants':electrical['lamps'],
   'graffiti':equipment.get('accentLamp'),
   'neonSection_mm':[8,16],'neonVoltage_V':12,
   'neonTotalModelLength_m':round(sum(n['length_m'] for n in neon),9),
   'neonByColor':dict(by_color),'neonByZone':dict(by_zone),
   'neonSegments':neon,
   'intent':'Warm white in rooms; blue contour in common hall and reception. No perimeter strip on common-hall glazing; no column outline lighting. RGB/RGBW remains an option contingent on actual product.',
   'notYetDesigned':['Actual luminaire model and IES/LDT photometry','Watts, efficacy, CCT/CRI/glare/pulsation values','Illuminance calculation','Emergency and evacuation lighting','Switches and control groups','Neon W/m, driver/controller positions and sizes','12 V feed lengths, injection points, voltage drop and accessible maintenance','Electrical circuits and protections'],
   'lengthCaution':'Model segment lengths are not procurement/cable lengths; add product-specific cut increment, connection and installation allowances only after product choice. Existing room/hall summary fields are geographic grouping, not a color grouping.'
 },
 'electricalPoints':{
   'coordinateUnits':'m',
   'heightDatum':'Outlet FACE CENTER above finished floor; do not use object insertion point as installation center.',
   'pointIdsNotCircuitIds':True,
   'semantics':{'PC01-PC26':'26 gaming stations;4 outlets each','S01-S04':'4 simulators;4 outlets each','P01-P02':'PS VIP / PS Standard;4 outlets each','R01-R09':'Reception end-point labels, not branch-circuit numbers'},
   'library':'CYBERX Wall Socket Point 26',
   'points':points,
   'notes':electrical['notes'],
   'inlet':{'code':'IN-01','guid':'FA6FAD14-EC31-40ED-9D71-0ED847C5A7A7','position_m':[0.76,12.42,0],
      'meaning':'User-designated prospective supply/input breaker location within technical shaft.',
      'modelType':'2D GDL annotation; not a designed switchboard or a selected protective device.',
      'landlordApproved':False,'rating':None,'sourceFeeder':None,
      'unknowns':['Landlord technical conditions and permission for installation in shaft','Exact upstream source, ownership boundary and metering','Allocated power, voltage/phases, earthing system and fault currents','Switchboard dimensions, working clearance and access','Cable route and fire stopping']},
   'missingEngineering':['Approved source parameters and available capacity','Equipment rated powers and operation modes','Load schedule with demand/coincidence basis','Distribution architecture and board/circuit schedule','Phase balance','Circuit identifiers linked to every point and every consumer','Cable types/cross sections/routes/lengths/install methods','Breaker/RCD/RCBO ratings and characteristics','Short-circuit and automatic disconnection calculations','Voltage-drop and thermal-derating calculations','Protective earthing and bonding, metal rack bonding assessment','Selectivity and upstream coordination','Lightning/surge protection interface when applicable','LED drivers/controllers and actual power feed points','Switch/control devices','Emergency lighting and fire-system interfaces','HVAC equipment power/control supplies','IT/POS/router/switch/UPS/CCTV/security and cleaning-service points after brief'],
   'important':'144 outlets are144 connection positions, not144 independent circuits and not144 identical rated loads. No nominal currents/cable sizes may be inferred from the count alone.'
 },
 'geometryAndAssumptions':{
   'confirmedByUser':{'overallInside_m':[10.20,16.28],'existingHeight_m':4.10,'mainPartitionHeight_m':3.20,'landlordMaxPartitionHeight_m':3.85,'mainPartitionThickness_m':0.10,'leftGlazingClearPanel_m':1.42,'leftGlazingVerticalProfile_m':0.08,'plannedStreetDoor_m':0.80,'bottomDoor_m':1.60,'bottomRightWallToDoor_m':0.34,'projectionDepth_m':0.37,'projectionToColumnClear_m':0.44},
   'adoptedNotExactlyMeasured':{'projectionAlongWall_m':0.40,'basis':'User: draw it, no more than40cm; adopted at upper bound.'},
   'derived':{'lowerColumnBottomFromFloorPlanBottom_m':2.27,'mainLeftWallX_m':0.45,'projectionXFace_m':0.82,'modelFloorContourArea_m2':160.6562},
   'areaCaution':'160.6562 m2 is current modeled floor/ceiling polygon area after shaft/projection cutouts. It is not a certified cadastral or final net usable room area and includes footprints of internal elements.',
   'mainPartitionsGapToCeiling_m':0.90,
   'lowScreens_m':[1.80,2.20],
   'coordinateFrame':measurements['coordinateFrame'],
   'designBrief':{'location':'Bалашиха, торговый центр, первый этаж','operatingHours':'24/7','minors':'Admission stated until22:00; operational/legal regime requires separate validation','food':'Packaged/prepared food and drinks; kettle/coffee machine/microwave at admin desk'},
   'lifeSafetyOccupancy':'26 PC seats,4 simulator seats and PS sofa seating are layout counts only. Calculate and approve occupancy/egress, including staff, waiting visitors and accessible use; do not treat seat count as approved capacity.'
 },
 'hvacReadiness':{
   'existingModelHVAC':'No engineering HVAC system established by these exports.',
   'availableInputs':['Room geometry and partitions','Planned equipment locations','Nominal seat allocation','Operating24/7','Existing height4.10; main partitions3.20; gap0.90'],
   'missingInputs':['Landlord supply/exhaust capacities, allowable connection points and schedules','Existing ventilation/heating/AC as-built documents','Outdoor-unit locations and facade constraints','Equipment actual heat release and simultaneous occupancy','Design indoor conditions and outdoor climate inputs','Thermal properties, solar/glazing loads, adjacent-space conditions','Heating supply parameters','Condensate disposal','Fire dampers/smoke control/fire alarm interface','Acoustic/vibration constraints and permitted plant noise','Required zone independence and service access'],
   'coordination':['HVAC electrical loads and start currents must enter EOM schedule','Ducts and cable trays must coordinate in0.90 m gap and around luminaires','Partition acoustic design and above-partition air transfer require joint AR/OV review','Do not assume a split AC supplies outdoor air']
 },
 'arReadiness':{
   'status':'Current layout and BIM architectural base are developed; this is not confirmation that a complete signed AR set or regulatory compliance review already exists.',
   'mustReview':['New street facade opening authorization and structural/glazing details','Fire strategy and egress/accessibility','Partition assemblies, acoustics, head details below existing ceiling and permitted height','Door schedule and fire/accessibility requirements','Finish fire-performance evidence','Penetrations, engineering shafts and servicing','Existing conditions/survey versus adopted dimensions','Sheets, title blocks, schedules, details and coordinated revision register']
 },
 'engineeringNextSessionWorkflow':[
  'Read this audit, active-layout.json and the handoff brief. Check files still exist and compare timestamps before touching model.',
  'Connect read-only; verify exactly one active Archicad instance and expected projectPath. If the user edited model since snapshot, extract and reconcile those edits before using stored coordinates.',
  'Save current user state and create a separately named engineering working copy with native Save As; retain clean baseline and libraries. Do not reopen an archival variant to bypass current user edits.',
  'Take fresh GUID/details/GDL snapshot and preserve an immutable before-state plus a change journal. Keep one writer to the live model; other agents work offline.',
  'Audit end-point placements, selected equipment and source data. Build load schedule with every unknown explicitly marked; never invent landlord approval, nominal powers or cable/protection ratings.',
  'Develop EOM and OV calculations and coordinated design. Existing point labels stay stable; add separate board/circuit identifiers and traceability fields.',
  'Build dedicated layer/view/layout combinations and standard sheets, associate schedules with GUIDs and use actual model geometry. PNG is a preview only.',
  'Verify end-to-end point-to-consumer-to-circuit correspondence, native positions/heights, clashes, calculations and sheet references; independently review engineering decisions.',
  'Save and verify native success plus file update. If connector save fails, use supported GUI workflow after reading computer-use skill, or ask user for Ctrl+S and verify resulting file timestamp. Never report saved from API-call completion alone.',
  'Publish review PDF and editable source plus calculation/load/cable/board registers; identify unresolved engineering inputs so preliminary sheets are not represented as construction-approved documentation.'
 ],
 'connector':{
   'root':str(ROOT),'python':str(ROOT/'.venv'/'Scripts'/'python.exe'),
   'bridge':str(ROOT/'room_bridge.py'),'server':str(ROOT/'.venv'/'Scripts'/'archicad-server.exe'),
   'usage':'from room_bridge import connect, OUT; async with connect() as ac: await ac.call(command, params, label=...)',
   'readCommands':['elements_get_all_elements (paginated)','elements_get_details_of_elements','elements_get_gdl_parameters_of_elements','elements_get3_d_bounding_boxes'],
   'schemas':'Bridge loads actual archicad_get_command_schema and writes schema/log files under club3-plan; inspect schemas before constructing any new mutation.',
   'saveCommand':'project_save_project; unreliable in observed session. Last final save was user Ctrl+S with file-time confirmation.',
   'scope':'Tapir-mediated native model connection, not a turnkey engineering calculation or standards-compliance solver.',
   'guiSkill':'C:/Users/avtos/.codex/plugins/cache/openai-bundled/computer-use/26.924.22138/skills/computer-use/SKILL.md',
   'guiState':'GUI operation was used after earlier tool difficulties; rediscover supported tools and read current skill before GUI use. A modal dialog or unfinished mouse input can block native edits.'
 },
 'layers':{'furniture':fj['layer'],'equipmentAndLighting':ej['layers'],'sampleLayer46':{'excludeFromEngineeringCounts':True,'elements':samples}},
 'offlineChecks':{'all41PointGuidsInSnapshot':True,'allEquipmentSpecGuidsInSnapshot':True,'neon62':True,'nativeLamp15':True,'noLiveApiCalled':True},
 'futureUnknownsSummary':['Landlord technical specifications and connection conditions','Actual electrical equipment powers/models','HVAC sources/capacities and heat/airflow calculations','Electrical network ratings and protection/cable design','Light photometry and emergency lighting','Second fridge placement','Life-safety/accessibility/occupancy review','Formal complete AR/EOM/OV set and required authorizations']
}
result['electricalPoints']['inlet']['allocatedPower'] = {
    'value_kW': 40,
    'status': 'confirmed_by_user_as_contract_value',
    'source': 'User message: выделенная мощность по договору40квт',
    'sourceDate': '2026-10-02',
    'formalContractReceived': False,
    'note': 'Use40 kW as the user-confirmed contractual limit for preliminary load balance; obtain the contract/technical conditions for formal issue. Voltage, phases, earthing, fault currents and upstream apparatus remain unknown. Do not infer the main breaker rating from40 kW alone.'
}
result['electricalPoints']['inlet']['unknowns'] = [
    s.replace('Allocated power, voltage/phases, earthing system and fault currents',
              'Voltage/phases, earthing system, fault currents and upstream protective apparatus')
    for s in result['electricalPoints']['inlet']['unknowns']
]
result['electricalPoints']['missingEngineering'] = [
    s.replace('Approved source parameters and available capacity',
              'Formal contract/technical conditions supporting user-confirmed40 kW, and remaining source parameters')
    for s in result['electricalPoints']['missingEngineering']
]
result['geometryAndAssumptions']['confirmedByUser']['contractAllocatedPower_kW'] = 40
(OUT/'model-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'output':str(OUT/'model-audit.json'),'counts':result['modelCounts'],'neonByColor':dict(by_color),'auditPass':True},ensure_ascii=False))

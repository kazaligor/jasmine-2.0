'use client';

import { Fragment, useEffect, useState } from 'react';

const nodes=['CORPORATE','ORIGINATION','STRUCTURING','DISTRIBUTION','LIQUIDITY'];
const frictions=[['01','ACCESS','Capital demand and investment liquidity rarely meet in one continuous flow.'],['02','PRICING','Fragmented execution makes pricing less transparent and capital less efficient.'],['03','LIQUIDITY','A transaction can create an asset without creating a reliable path for secondary liquidity.'],['04','REUSE','Capital often stops at settlement instead of becoming the input for the next transaction.']];
const oldModel=['Product','Transaction','Settlement'];
const jasmine=['Capital','Origination','Structuring','Distribution','Liquidity','Reuse','Repeat'];
function Flow(){const [active,setActive]=useState(0);useEffect(()=>{const id=setInterval(()=>setActive(x=>(x+1)%nodes.length),1200);return()=>clearInterval(id)},[]);return <div className="flow-stage" aria-label="Capital flow"><div className="flow-line"/>{nodes.map((n,i)=><div className={'flow-node '+(i===active?'active':'')} key={n} style={{left:(8+i*21)+'%'}}><span>{n}</span></div>)}</div>}
function Section({id,eyebrow,title,children,copy}:{id:string;eyebrow:string;title:string;children:React.ReactNode;copy:string}){return <section id={id} className="section"><div className="section-head"><div className="eyebrow">{eyebrow}</div><div><h2>{title}</h2><p>{copy}</p></div></div>{children}</section>}

const engineScenarios = {
  Financing:{label:'CORPORATE FINANCING',type:'STOCK',desc:'Longer-duration capital demand where structure, investor fit and repeat issuance matter.',cfa:'Useful when structured issuance, settlement and distribution improve funding access or operating cost.',investor:'PRIVATE / INSTITUTIONAL',liquidity:'PRIMARY → SELECTIVE SECONDARY',reuse:'REINVEST / REFINANCE',value:'ORIGINATION + STRUCTURING + DISTRIBUTION'},
  Structured:{label:'STRUCTURED FLOW',type:'HYBRID',desc:'Asset-backed or commercial flows where financing, distribution and risk allocation interact.',cfa:'Useful when programmability, transparency and automated servicing improve the structure.',investor:'INSTITUTIONAL / CORPORATE',liquidity:'PRIMARY + SECONDARY',reuse:'TRADE / FINANCE / REUSE',value:'STRUCTURING + DISTRIBUTION + FINANCING'},
  Treasury:{label:'LIQUIDITY & TREASURY',type:'FLOW',desc:'Short-cycle capital needs where speed, settlement and repeatability can materially change economics.',cfa:'Useful only where automation, settlement or controlled transfer creates measurable efficiency.',investor:'LIQUIDITY PROVIDERS / INVESTORS',liquidity:'REUSABLE / HIGH-FREQUENCY',reuse:'CAPITAL → NEXT FLOW',value:'DISTRIBUTION + FINANCING + INFRASTRUCTURE'}
} as const;
const engineStages = ['CAPITAL DEMAND','ORIGINATION','STRUCTURING','DISTRIBUTION','PRIMARY','SECONDARY','REUSE','CONTRIBUTION P&L'];
function JasmineEngine(){
  const [scenario,setScenario]=useState<keyof typeof engineScenarios>('Financing');
  const [stage,setStage]=useState(0); const s=engineScenarios[scenario];
  const stageCopy=[
    ['WHY NOW',s.desc],
    ['SOURCE','Route qualified '+s.label.toLowerCase()+' into a repeatable capital flow.'],
    ['DESIGN','Select structure, risk allocation and instrument only where they improve the underlying economics.'],
    ['MATCH','Connect the structure to the investor segment most aligned with its risk, yield and liquidity profile.'],
    ['ISSUE','Create the primary transaction and establish the path to the next capital event.'],
    ['LIQUIDITY','Enable price discovery, transfer and secondary execution where demand and economics support it.'],
    ['REUSE','Return capital to financing, collateral, reinvestment or the next issuance.'],
    ['VALUE','Target '+s.value.toLowerCase()+' while subtracting variable and risk costs.']
  ][stage];
  return <Section id="engine" eyebrow="03.5 / JASMINE ENGINE" title="One flow. One economic test." copy="Choose a capital use case. Then follow the same engine from demand to contribution P&L. The instrument changes; the operating logic does not.">
    <div className="engine-shell">
      <div className="engine-scenarios">{(Object.keys(engineScenarios) as Array<keyof typeof engineScenarios>).map(x=><button className={scenario===x?'selected':''} onClick={()=>{setScenario(x);setStage(0)}} key={x}><span>{engineScenarios[x].type}</span>{engineScenarios[x].label}</button>)}</div>
      <div className="engine-route">{engineStages.map((x,i)=><Fragment key={x}><button className={stage===i?'active':''} onClick={()=>setStage(i)}><i>{String(i+1).padStart(2,'0')}</i><span>{x}</span></button>{i<engineStages.length-1&&<b>→</b>}</Fragment>)}</div>
      <div className="engine-detail"><div><span className="eyebrow">{stageCopy[0]}</span><h3>{stageCopy[1]}</h3><p>{s.desc}</p></div><div className="engine-metrics"><div><span className="eyebrow">CAPITAL TYPE</span><strong>{s.type}</strong></div><div><span className="eyebrow">INVESTOR</span><strong>{s.investor}</strong></div><div><span className="eyebrow">LIQUIDITY</span><strong>{s.liquidity}</strong></div><div><span className="eyebrow">REUSE</span><strong>{s.reuse}</strong></div></div></div>
      <div className="engine-bottom"><div><span className="eyebrow">CFA TEST</span><strong>{s.cfa}</strong></div><div><span className="eyebrow">ECONOMIC VALUE POOL</span><strong>{s.value}</strong></div></div>
    </div>
  </Section>
}
const liquidityModes = {
  Primary:{label:'PRIMARY MARKET',desc:'Capital moves from issuer to the first investor. The engine focuses on origination, structuring and distribution.',route:['ISSUER','STRUCTURE','INVESTOR A'],signals:['ORIGINATION','STRUCTURING','DISTRIBUTION']},
  Secondary:{label:'SECONDARY MARKET',desc:'Capital moves between investors. The engine focuses on price discovery, market making and liquidity.',route:['INVESTOR A','SECONDARY','INVESTOR B'],signals:['TRADING','MARKET MAKING','PRICING']}
} as const;
function LiquiditySection(){
  const [mode,setMode]=useState<keyof typeof liquidityModes>('Primary');
  const m=liquidityModes[mode];
  return <Section id="liquidity" eyebrow="03 / LIQUIDITY ENGINE" title="A transaction should create a path to the next transaction." copy="Primary issuance is only the beginning. Secondary trading, market making, pricing feedback and financing turn an asset into a reusable capital component.">
    <div className="liquidity-map"><div className="liquidity-toolbar"><div className="toggle">{(Object.keys(liquidityModes) as Array<keyof typeof liquidityModes>).map(x=><button className={mode===x?'selected':''} onClick={()=>setMode(x)} key={x}>{x}</button>)}</div><span className="liquidity-status"><span className="pulse"/> {m.label}</span></div>
    <p className="interactive-copy">{m.desc}</p><div className="capital-path"><span>CAPITAL</span><i>→</i><strong>{mode==='Primary'?'ISSUER':'INVESTOR A'}</strong><i>→</i><b>{mode==='Primary'?'PRIMARY':'SECONDARY'}</b><i>→</i><strong>{mode==='Primary'?'INVESTOR A':'INVESTOR B'}</strong><i>→</i><span>{mode==='Primary'?'LIQUIDITY':'REUSE'}</span></div><div className="liq-row">{m.route.map((x,i)=><Fragment key={x}><span className={i===1?'route-core':''}>{x}</span>{i<2&&<b>→</b>}</Fragment>)}</div>
    <div className="liq-secondary"><span>{m.signals[0]}</span><strong>{m.signals[1]}</strong><span>{m.signals[2]}</span></div><div className="liq-footer"><span>PRICE FEEDBACK</span><span>↕ CAPITAL</span><span>LIQUIDITY</span></div></div>
  </Section>
}
const systemModes = {
  Stock:{title:'Corporate financing',desc:'Longer-duration funding needs where asset quality, structure and repeat issuance matter.',examples:['Receivables','Infrastructure','Real assets'],liquidity:'Structured / episodic',economics:'Origination + structuring'},
  Hybrid:{title:'Structured flows',desc:'Structures combining underlying assets or commercial flows with financing and distribution.',examples:['Supply-chain','Asset-backed','Warehouse / commodity'],liquidity:'Primary + selective secondary',economics:'Structuring + distribution + financing'},
  Flow:{title:'Liquidity & treasury',desc:'Short-cycle needs where speed, automation, settlement and reuse can materially improve economics.',examples:['Short-term financing','Treasury','Trade flows'],liquidity:'High-frequency / reusable',economics:'Distribution + financing + infrastructure'}
} as const;
function BusinessSystemSection(){
  const [mode,setMode]=useState<keyof typeof systemModes>('Stock'); const m=systemModes[mode];
  return <Section id="system" eyebrow="04 / BUSINESS SYSTEM" title="Stock. Hybrid. Flow." copy="The opportunity map is a system of capital use cases, not a catalogue of CFA products. Instruments enter only where they improve the underlying economics.">
    <div className="system-interactive"><div className="system-tabs">{(Object.keys(systemModes) as Array<keyof typeof systemModes>).map(x=><button className={mode===x?'selected':''} onClick={()=>setMode(x)} key={x}>{x}</button>)}</div>
    <div className="system-detail"><div><span className="eyebrow">SELECTED LAYER</span><h3>{m.title}</h3><p>{m.desc}</p></div><div><span className="eyebrow">USE CASES</span>{m.examples.map(x=><strong key={x}>{x}</strong>)}</div><div><span className="eyebrow">LIQUIDITY PROFILE</span><strong>{m.liquidity}</strong><span className="eyebrow">PRIMARY VALUE POOL</span><strong>{m.economics}</strong></div></div></div>
  </Section>
}
const econPools = {
  ORIGINATION:'Value is created by sourcing qualified corporate demand and converting it into repeatable financing flow.',
  STRUCTURING:'Value is created by designing a structure that improves funding fit, distribution and risk allocation.',
  DISTRIBUTION:'Value is created by matching instruments with investor demand and reducing placement friction.',
  SECONDARY:'Value is created when an existing position can change hands with credible price discovery and execution.',
  FINANCING:'Value is created when an asset or position becomes a useful input for another financing transaction.',
  INFRASTRUCTURE:'Value is created by lowering the variable cost of repeated issuance, settlement, servicing and data flows.'
} as const;
function EconomicsSection(){
  const [pool,setPool]=useState<keyof typeof econPools>('DISTRIBUTION');
  return <Section id="economics" eyebrow="05 / ECONOMICS" title="Volume ≠ Value." copy="The decision metric is contribution P&amp;L, not issuance volume. Every flow must survive variable costs, risk costs and capital requirements.">
    <div className="economics"><div className="econ-formula"><span>REVENUE POOLS</span><b>−</b><span>VARIABLE COSTS</span><b>−</b><span>RISK COSTS</span><b>=</b><strong>CONTRIBUTION P&amp;L</strong></div>
    <div className="econ-grid">{(Object.keys(econPools) as Array<keyof typeof econPools>).map(x=><button className={pool===x?'selected':''} onClick={()=>setPool(x)} key={x}><span className="eyebrow">{x}</span><p>{econPools[x]}</p></button>)}</div>
    <div className="econ-readout"><span className="eyebrow">CONTRIBUTION TEST</span><strong>{pool}</strong><p>{econPools[pool]} The test is whether contribution remains positive after variable and risk costs — not whether nominal volume grows.</p></div></div>
  </Section>
}
export default function Home(){return <main className="page"><nav className="nav mono"><a href="#">JASMINE</a><div className="nav-links"><a href="#capital">01 PROBLEM</a><a href="#engine">02 ENGINE</a><a href="#liquidity">03 LIQUIDITY</a><a href="#economics">04 ECONOMICS</a><a href="#vtb">05 VTB</a><a href="#roadmap">06 ROADMAP</a></div><span className="nav-progress">CAPITAL / ROUTING / LIQUIDITY</span></nav>
<section className="section hero"><div><div className="eyebrow reveal">JASMINE / 02.0</div><h1 className="reveal delay1">CAPITAL<br/>DISTRIBUTION<br/><span style={{color:'var(--accent)'}}>&amp; LIQUIDITY</span><br/>ENGINE</h1></div><div><div className="hero-sub reveal delay2"><div className="eyebrow">THE THESIS</div><p className="hero-copy">Connecting corporate capital demand with investor liquidity — through origination, structuring, distribution, secondary markets and capital reuse.</p></div><Flow/></div></section>
<Section id="capital" eyebrow="01 / CAPITAL IS THERE" title="Capital exists. Liquidity is fragmented." copy="The opportunity is not to create another instrument. It is to connect capital demand and investment liquidity into a repeatable financial flow."><div className="capital-grid"><div className="capital-cell"><span className="eyebrow">DEMAND</span><strong>Corporate<br/>Capital</strong><p>Financing needs across working capital, assets, projects and structured flows.</p></div><div className="capital-cell capital-center"><div className="capital-ring">CAPITAL<br/>ROUTING</div></div><div className="capital-cell"><span className="eyebrow">SUPPLY</span><strong>Investor<br/>Liquidity</strong><p>Capital looking for yield, diversification, liquidity and efficient deployment.</p></div></div></Section>
<Section id="friction" eyebrow="02 / THE FRICTION" title="The gap is not the absence of capital." copy="It is the friction between access, pricing, liquidity and reuse. Jasmine is designed around removing those frictions where the economics justify it."><div className="frictions">{frictions.map(([n,h,p])=><article className="friction" tabIndex={0} key={n}><b>{n}</b><h3>{h}</h3><p>{p}</p><span className="friction-mark">↗</span></article>)}</div></Section>
<Section id="thesis" eyebrow="03 / JASMINE THESIS" title="From financial instruments to capital infrastructure." copy="CFA is not the destination. It is one of the instruments inside the engine — used where it improves speed, access, automation, settlement, distribution or capital efficiency."><div className="thesis"><div className="model"><h3>Existing model</h3><div className="steps">{oldModel.map((x,i)=><div className="step" key={x}><i>0{i+1}</i>{x}</div>)}</div></div><div className="model jasmine"><h3>Jasmine model</h3><div className="steps">{jasmine.map((x,i)=><div className="step" key={x}><i>{String(i+1).padStart(2,'0')}</i>{x}</div>)}</div></div></div></Section>
<JasmineEngine/><LiquiditySection/>
<Section id="reuse" eyebrow="03.5 / CAPITAL REUSE" title="Capital does not stop at settlement." copy="The engine compounds when an investor can trade, finance, reinvest and return capital to the next issuance."><div className="reuse-loop">{['Issue','Invest','Trade','Collateral','Finance','Reinvest','New issue'].map((x,i)=><div className="reuse-node" key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div></Section>
<BusinessSystemSection/>
<EconomicsSection/>
<Section id="vtb" eyebrow="06 / WHY VTB" title="The advantage is not one product. It is the combination." copy="VTB already has pieces of the system across corporate origination, capital markets, distribution, liquidity, infrastructure and risk. Jasmine connects them into a repeatable flow."><div className="vtb-stack"><div><span className="eyebrow">TODAY</span><strong>Corporate Origination</strong><strong>Capital Markets</strong><strong>Investor Distribution</strong><strong>Risk &amp; Infrastructure</strong></div><div className="stack-arrow">→</div><div className="jasmine-core"><span className="eyebrow">JASMINE</span><strong>CONNECT</strong><p>Route demand to liquidity. Route liquidity back to demand.</p></div><div><span className="eyebrow">BUILT OVER TIME</span><strong>Liquidity</strong><strong>Pricing Data</strong><strong>Repeatability</strong><strong>Capital Reuse</strong></div></div></Section>
<Section id="flywheel" eyebrow="07 / FLYWHEEL" title="Liquidity creates the conditions for more liquidity." copy="The flywheel is not a claim of network effects. Each step must improve the economics of the next step."><div className="flywheel">{['ISSUERS','INSTRUMENTS','INVESTORS','LIQUIDITY','PRICING','TRANSACTIONS','DATA','RISK PRICING'].map((x,i)=><div key={x} style={{transform:'rotate('+(i*45)+'deg) translateY(-150px) rotate('+(-i*45)+'deg)'}}>{x}</div>)}</div></Section>
<Section id="roadmap" eyebrow="08 / 12–24 MONTHS" title="Build in gates, not promises." copy="Scale follows proof. Each phase earns the right to unlock the next one."><div className="roadmap">{[['01','FOUNDATION','0–3 MONTHS','Prove the core flow and operating model.'],['02','DISTRIBUTION','3–6 MONTHS','Connect repeatable issuer and investor journeys.'],['03','LIQUIDITY','6–12 MONTHS','Build secondary mechanisms and pricing feedback.'],['04','REUSE','12–18 MONTHS','Turn liquidity into financing and reinvestment.'],['05','SCALE','18–24 MONTHS','Scale only where contribution economics are proven.']].map(([n,h,t,p])=><article key={n}><span>{n}</span><div><b>{h}</b><em>{t}</em><p>{p}</p></div></article>)}</div></Section>
<section className="final section"><div className="eyebrow">JASMINE / FINAL THOUGHT</div><h2>The opportunity is not to issue more digital assets.</h2><p>The opportunity is to make capital move more efficiently.</p><div className="final-flow">CAPITAL <span>→</span> DISTRIBUTION <span>→</span> LIQUIDITY <span>→</span> REUSE <span>→</span> GROWTH</div></section><footer className="footer"><span>JASMINE / CAPITAL DISTRIBUTION &amp; LIQUIDITY ENGINE</span><span>STRATEGIC CONCEPT / 2026</span></footer></main>}

import { checkForURL } from "./checkURL"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value
    if(Client.checkForURL(formText)){

    console.log("::: Form Submitted :::")
    postReq('http://localhost:8081/api',{url:formText})
    .then(function(res) {
        document.getElementById('results').innerHTML=''
        var s=document.createElement('strong')
        s.innerHTML ="Form Results:"
        var pol=document.createElement('div')
        pol.innerHTML='Polarity: '+polarityCheck(res.score_tag)
        var agr = document.createElement('div')
        agr.innerHTML = `Agreement: + ${res.agreement}`
        var sub = document.createElement('div')
        sub.innerHTML = `Subjectivity: + ${res.subjectivity}`
        var con = document.createElement('div')
        con.innerHTML = `Confidence: + ${res.confidence}`
        var ir = document.createElement('div')
        ir.innerHTML = `Irony: + ${res.irony}`
        document.getElementById('results').appendChild(s)
        document.getElementById('results').appendChild(pol)
        document.getElementById('results').appendChild(agr)
        document.getElementById('results').appendChild(sub)
        document.getElementById('results').appendChild(con)
        document.getElementById('results').appendChild(ir)
        })
}
else{
    alert('Invalid URL')
}
}

async function postReq(url="",data={}){
    const res=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        mode:'cors',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    })
    try{
        const recData=await res.json()
        return recData
    }catch (error){
        console.log('error',error)
    }
}

const polarityCheck=(p)=>{
    let text=''
    if (p === 'P+')
        text='Strong Positive'
    else if(p==='P')
        text='Positive'
    else if (p ==='N')
        text='Negative'
    else if (p ==='N+')
        text='Strong Negative'
    else
        text='No Sentiment'
    return text
}

export { handleSubmit }
export{checkPolarity}

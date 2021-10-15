import { checkForURL } from "./checkURL"

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value
    if(Client.checkForURL(formText)){

    console.log("::: Form Submitted :::")
    postReq('http://localhost:8081/api',{url:formText})
    .then(function(res) {
        document.getElementById('polarity').innerHTML = 'Polarity: ' + checkPolarity(res.score_tag)
        document.getElementById('agreement').innerHTML=`Agreement: + ${res.agreement}`
        document.getElementById('subjectivity').innerHTML = `Subjectivity: + ${res.subjectivity}`
        document.getElementById('confidence').innerHTML = `Confidence: + ${res.confidence}`
        document.getElementById('irony').innerHTML = `Irony: + ${res.irony}`
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
        const receivedData=await res.json()
        console.log('Received Data',receivedData)
        return receivedData
    }catch (error){
        console.log('error',error)
    }
}

const checkPolarity=(p)=>{
    let text=''
    switch (p){
        case 'P+':
            text='Strong Positive'
        case 'P':
            text='Positive'
        case 'N':
            text='Negative'
        case 'N+':
            text='Strong Negative'
        case 'NONE':
            text='No Sentiment'
    }
    return text
}

export { handleSubmit }
export{checkPolarity}
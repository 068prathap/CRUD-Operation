const allUserDetails=[
    {'image Url': '', 'first name': 'prathap', 'last name': 'selvam', email: 'prathapselvam6@gmail.com', 'mobile number': '9095057113', role: "Development"},
    {'image Url': '', 'first name': 'surya', 'last name': 'kumar', email: 'surya@gmail.com', 'mobile number': '9095057113', role: "Testing"},
    {'image Url': '', 'first name': 'lenin', 'last name': 'bevan', email: 'lenin@gmail.com', 'mobile number': '9095057113', role: "Hr"},
    {'image Url': '', 'first name': 'praveen', 'last name': 'kumar', email: 'praveen@gmail.com', 'mobile number': '9095057113', role: "Management"},
    {'image Url': '', 'first name': 'prince', 'last name': 'kumar', email: 'prince@gmail.com', 'mobile number': '9095057113', role: "Hr"}
]

let isEditing=false

let arrangeType=null

let role=''

function submit(element,edit)
{
    if(isEditing && edit!=='edit')
    {
        return
    }
    
    let validation=true

    const inputs=element.querySelectorAll('.input')
    const errors=element.querySelectorAll('.invalid-feedback')

    for (let i=0;i<inputs.length;i++)
    {
        if(inputs[i].value)
        {
            console.log(inputs[i],i);
            if(inputs[i].name==='email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs[i].value))
            {
                errors[i].innerHTML=`Please enter correct ${errors[i].getAttribute("name")}`
                errors[i].classList.remove("invisible")
                validation=false
            }
            else if(inputs[i].name==='mobile number' && !/^\d{10}$/.test(inputs[i].value))
            {
                console.log('hi');
                errors[i].innerHTML=`Please enter correct ${errors[i].getAttribute("name")}`
                errors[i].classList.remove("invisible")
                validation=false
            }
            else
            {
                errors[i].classList.add("invisible")
            }
        }
        else
        {
            errors[i].classList.remove("invisible")
            errors[i].innerHTML=`Please enter ${errors[i].getAttribute("name")}`
            validation=false
        }
    }
    if(validation)
    {
        if(edit!=='edit')
        {
            const object={}
            for(const input of inputs)
            {
                object[input.name]=input.value
            }
            allUserDetails.unshift(object)

            document.getElementById('tableBody').innerHTML=''

            arrangeType? arrangeType(): null

            console.log(allUserDetails);
        }

        edit==='edit'? changeValues(element): showData(Object.values(allUserDetails[0]),1,1)
        edit!=='edit'? clearForm(): null
    }
}

function showData(data,length,sno)
{
    if(role!=='' && data[5]!==role)
    {
        if(length<allUserDetails.length)
        {
            showData(Object.values(allUserDetails[length]),length+1,sno)
        }

        return
    }

    const newRow=document.createElement('tr')
    newRow.id=length

    const snoTd=document.createElement('td')
    snoTd.className='pb-0'
    snoTd.innerHTML=sno
    sno+=1
    newRow.append(snoTd)

    for(let i=1;i<7;i++)
    {
        const td=document.createElement('td')
        td.className='pb-0'

        if(i===1)
        {
            const imageTag=document.createElement('img')
            imageTag.className='rounded-circle avatar'

            try
            {
                new URL(data[0])
                imageTag.src=`${data[0]}`
            }
            catch
            {
                imageTag.src='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
            }
            td.append(imageTag)
        }
        else
        {
            const pTag=document.createElement('p')

            pTag.className='m-0'
            pTag.innerHTML=data[i-1]
            td.append(pTag)
        }

        const errors=document.getElementById('form').querySelectorAll('.invalid-feedback')

        const divTag=document.createElement('div')
        divTag.className='d-none'

        let inputTag
        if(i===6)
        {
            inputTag=document.getElementById('selectTag').cloneNode(true)
        }
        else
        {
            inputTag=document.createElement('input')
            inputTag.name=errors[i-1].getAttribute("name")
            inputTag.className='form-control input'
            inputTag.type='text'
        }
        divTag.append(inputTag)

        const pTag=document.createElement('p')
        pTag.className='ps-2 d-block invisible invalid-feedback'
        pTag.setAttribute('name',errors[i-1].getAttribute("name"))
        divTag.append(pTag)

        td.append(divTag)

        newRow.append(td)
    }

    const buttonTd=document.createElement('td')
    buttonTd.className='pb-0'

    const editDiv=document.createElement('div')
    editDiv.id='editButton'

    const editButton=document.createElement('button')
    editButton.className='btn btn-outline-success m-1 actionButton'
    editButton.onclick=function(){editData(this.parentElement.parentElement.parentElement)}
    editButton.innerHTML='Edit'
    editDiv.append(editButton)

    const deleteButton=document.createElement('button')
    deleteButton.className='btn btn-outline-danger m-1 actionButton'
    deleteButton.onclick=function(){removeData(this.parentElement.parentElement.parentElement)}
    deleteButton.innerHTML='Del'
    editDiv.append(deleteButton)

    buttonTd.append(editDiv)

    const updateDiv=document.createElement('div')
    updateDiv.id='updateButton'
    updateDiv.className='d-flex d-none'

    const updateButton=document.createElement('button')
    updateButton.className='btn btn-primary mb-3 mx-1 d-flex fw-bold align-items-center updateButton'
    updateButton.onclick=function(){submit(this.parentElement.parentElement.parentElement,'edit')}
    updateButton.innerHTML='<i class="bi bi-arrow-repeat fs-5 pe-1 submitButtonIcon"></i>Update'
    updateDiv.append(updateButton)

    const cancelButton=document.createElement('button')
    cancelButton.className='btn btn-danger mb-3 mx-1 d-flex fw-bold align-items-center updateButton'
    cancelButton.onclick=function(){endEditing(this.parentElement.parentElement.parentElement)}
    cancelButton.innerHTML='<i class="bi bi-x fs-3 submitButtonIcon"></i>'
    updateDiv.append(cancelButton)

    buttonTd.append(updateDiv)

    newRow.append(buttonTd)

    document.getElementById('tableBody').appendChild(newRow)

    if(length<allUserDetails.length)
    {
        showData(Object.values(allUserDetails[length]),length+1,sno)
    }
}
showData(Object.values(allUserDetails[0]),1,1)

function removeData(element)
{
    element.remove()

    let rows=document.getElementById('tableBody').children
    for(let i=0;i<rows.length-1;i++)
    {
        rows[i].firstElementChild.innerHTML=`${i+1}`
    }

    allUserDetails.splice([element.id-1],1)

    document.getElementById('tableBody').innerHTML=''

    showData(Object.values(allUserDetails[0]),1,1)
}

function editData(element)
{
    isEditing=true

    const tdList=element.querySelectorAll('td')
    
    tdList.forEach((td,index)=>
    {
        if(index===1)
        {
            const tdChildren=td.children

            tdChildren[1].firstElementChild.value=tdChildren[0].src

            tdChildren[0].classList.add('d-none')
            tdChildren[1].classList.remove('d-none')

            tdChildren[1].children[1].classList.add("invisible")
        }
        if(index>1 && index<tdList.length-1)
        {
            const tdChildren=td.children

            tdChildren[1].firstElementChild.value=tdChildren[0].innerHTML

            tdChildren[0].classList.add('d-none')
            tdChildren[1].classList.remove('d-none')

            tdChildren[1].children[1].classList.add("invisible")
        }
    })

    element.querySelector('#editButton').classList.add('d-none')
    element.querySelector('#updateButton').classList.remove('d-none')
}

function changeValues(element)
{
    const tdList=element.querySelectorAll('td')

    tdList.forEach((td,index)=>
    {
        if(index===1)
        {
            const tdChildren=td.children

            try
            {
                new URL(tdChildren[1].firstElementChild.value)
                tdChildren[0].src=tdChildren[1].firstElementChild.value
            }
            catch
            {
                tdChildren[0].src='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
            }
            allUserDetails[element.id-1][tdChildren[1].firstElementChild.name]=tdChildren[0].src

            tdChildren[0].classList.remove('d-none')
            tdChildren[1].classList.add('d-none')
        }
        if(index>1 && index<tdList.length-1)
        {
            const tdChildren=td.children

            tdChildren[0].innerHTML=tdChildren[1].firstElementChild.value

            allUserDetails[element.id-1][tdChildren[1].firstElementChild.name]=tdChildren[0].innerHTML

            tdChildren[0].classList.remove('d-none')
            tdChildren[1].classList.add('d-none')
        }
    })

    document.getElementById('tableBody').innerHTML=''

    showData(Object.values(allUserDetails[0]),1,1)

    endEditing(element)
}

function endEditing(element)
{
    isEditing=false

    element.querySelector('#editButton').classList.remove('d-none')
    element.querySelector('#updateButton').classList.add('d-none')

    const tdList=element.querySelectorAll('td')
    
    tdList.forEach((td,index)=>
    {
        if(index>0 && index<tdList.length-1)
        {
            const tdChildren=td.children

            tdChildren[0].classList.remove('d-none')
            tdChildren[1].classList.add('d-none')
        }
    })
}

function clearForm()
{
    let inputs = document.getElementById('form').querySelectorAll('.input')
    for (const input of inputs)
    {
        input.value=''
    }
}

function arrangeData(type)
{
    if(type==='asc')
    {
        arrangeType=ascending

        document.getElementById('ascButton').classList.remove('btn-outline-success')
        document.getElementById('ascButton').classList.add('btn-success')

        document.getElementById('desButton').classList.add('btn-outline-success')
        document.getElementById('desButton').classList.remove('btn-success')

        if(allUserDetails.length)
        {
            ascending()
        
            document.getElementById('tableBody').innerHTML=''
    
            showData(Object.values(allUserDetails[0]),1,1)
        }
    }
    else
    {
        arrangeType=descending

        document.getElementById('desButton').classList.remove('btn-outline-success')
        document.getElementById('desButton').classList.add('btn-success')

        document.getElementById('ascButton').classList.add('btn-outline-success')
        document.getElementById('ascButton').classList.remove('btn-success')

        if(allUserDetails.length)
        {
            descending()
        
            document.getElementById('tableBody').innerHTML=''
            
            showData(Object.values(allUserDetails[0]),1,1)
        }
    }
}

function ascending()
{
    allUserDetails.sort((a,b)=>
    {
        if(a['first name']<b['first name'])
        {
            return -1
        }
    })
}

function descending()
{
    allUserDetails.sort((a,b)=>
    {
        if(a['first name']>b['first name'])
        {
            return -1
        }
    })
}

function changeRole(value)
{
    role=value
    
    if(allUserDetails.length)
    {
        document.getElementById('tableBody').innerHTML=''
    
        showData(Object.values(allUserDetails[0]),1,1)
    }
}
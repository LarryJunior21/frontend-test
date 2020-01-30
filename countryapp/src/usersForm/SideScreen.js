import React, {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectBox from '../features/select-box';

function SideScreen() {
    let [name, setName] = useState('');
    let lastC = '';
    let people = useSelector(state => state.people);
    const country = useSelector(state => state.country);
    const dispatch = useDispatch();
    let flag = false;
    let obj = useState({
            name: '',
            country: ''
        }
    );

    useEffect(() => {
        document.getElementById("editUser").value = '*';
    }, [])

    //FUNCTION TO CHANGE THE USER INFO
    async function editing(e){
        setName(e.target.value)
        flag = true;
    }

    //FUNCTION TO CHANGE LABEL COLOR
    async function mudacor(){
        document.getElementById("labelName").style.color = '#ACACAC';
    }
    
    //EDIT PEOPLE FUNCTION
    async function edd(){
        let id = -1;
        for(var x = 0; x < people.length; x++)
        {
            if(people[x].id == document.getElementById("editUser").value)
                id = people[x].id;
        }
        if(id != -1)
        {
            if(!flag)
                name = document.getElementById("username").value

            obj = {
                id,
                name,
                country: country.name
            };
            people[id] = obj;
            flag = false;
        }
        setName('');
        document.getElementById("username").value = "";
        document.getElementById("username").focus();
        document.getElementById("labelName").textContent = "*Name";
        document.getElementById("labelCountry").textContent = "Select your country";
    }

    //ADD PEOPLE FUNCTION
    async function add(){
        document.getElementById("labelName").textContent = "*Name";
        document.getElementById("labelCountry").textContent = "Select your country";

        country.population += 1; 
        obj = {
            id: people[people.length-1].id + 1,
            name,
            country: country.name
        };
        people.push(obj);
        dispatch({ type: 'ADD_PEOPLE', people});
        setName('');
        document.getElementById("username").value = "";
        document.getElementById("username").focus();
    }

    //FUNCTION FOR CLICKING ON SUBMIT
    async function handleSubmit() {
        if(country && document.getElementById("username").value && document.getElementById("editUser").value === '*')//IF TRUE ADD THE NEW CITIZEN ON THE LIST
            add();
        else if(!document.getElementById("username").value)
            {document.getElementById("labelName").style.color = 'red'; document.getElementById("username").focus();}
        else
            edd();
    }

    //RENDER THE SUBMIT FIELDS
    return(
        <>
        <form>
            <div className="input-block">
                <label htmlFor="" id="labelName">*Name</label>
                <input name="username" id="username" required onChange={e => editing(e)} onClick={mudacor}/>
            </div>
            <div className="input-block" id='dropdown'>
                <SelectBox htmlFor="" id="countryId" required/>
            </div>
            <div className="input-block">
                <label htmlFor='myImage' id="minhalabel">SEND IMAGE (Optional)</label>
                <input type="file" name="myImage" id='myImage' accept="image/x-png,image/jpeg"/>
            </div>
            
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>

        {/* CONTROLE PARA EDITAR */}
        <input type="hidden" id="editUser"/>
        </>
    );
}

export default SideScreen;
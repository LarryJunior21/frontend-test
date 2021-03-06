import React, { useEffect, useState } from 'react';// eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
import countries from '../../api/country';

import './styles.css';

function SelectBox(){
    const country = useSelector(state => state.country);
    let excountry = useSelector(state => state.excountry);
    const [paises, setPaises] = useState([]);
    const dispatch = useDispatch();

    const [showItems, setShowItems] = useState('');

    useEffect(() => {
        setShowItems(false);
        countries().then(item => {
          setPaises(item)
        }).catch(err => (alert("Error: couldn't load countries, press F5 to try again (IF THIS DOESN'T SHOW UP, THE COUNTRIES WERE LOADED)")))
    }, [])

    async function dropDown(){
        setShowItems(!showItems);

    }

    async function selectItem(item){
        document.getElementById("labelCountry").style.color = '#ACACAC';
        dispatch({ type: 'CHANGE_COUNTRY', pais: item})
        setShowItems(false);
        document.getElementById("username").focus();
        document.getElementById("labelName").style.color = '#ACACAC';
    }

    return (
        <> 
            <label htmlFor="" id="labelCountry">Select your country</label>
            <div className="select-box--box" >
                <div className="select-box--container">
                    <span className='select-box--arrow-down' onClick={dropDown}/>
                    <div className="select-box--selected-item" id="AA">
                        { country.name }
                        
                    </div>
                    {/* <div className="select-box--selected-item" onClick={dropDown}> */}
                        {/* <span className={`${this.state.showItems ? 
                            'select-box--arrow-up' : 'select-box--arrow-down'}`} /> */}
                            
                    {/* </div> */}
                </div>
                <div style={{display: showItems ? 'block' : 'none'}} // ORDER COUNTRIES BY POPULATION
                        className="select-box--items">
                        {
                            paises.sort((a, b) => (a.population > b.population) ? -1 : 1),
                            paises.map(item => 
                                <div 
                                    key={item.code}
                                    onClick={() => selectItem(item) }
                                    className={country === item ? 'selected' : ''}
                                    id='selecionador'
                                >
                                    { item.name + " (Population : " + item.population + ")" }
                                </div>
                            )
                        }
                    </div>
            </div> 
        </>
    );
}

export default SelectBox;
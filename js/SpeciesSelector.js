
//var sel_species;
let sel_species_toGet

function getSelected(){  
    selectElement = document.querySelector('#Species_Select');
    sel_species = selectElement.value;
    sel_species_toGet = sel_species
    console.log("species selector: " + sel_species)
    document.querySelector('.Selected_Species').textContent = sel_species;
}

export{sel_species_toGet}
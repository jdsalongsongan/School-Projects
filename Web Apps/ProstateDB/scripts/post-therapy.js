window.onload = () => {
    if (sessionStorage.getItem('user') === undefined || sessionStorage.getItem('user') === null) {
        location.href = '/login'
    }
    if(sessionStorage.getItem('patient_code') == null && sessionStorage.getItem('number_of_therapy') == null) location.href = '/'
    else {
        const titletext = document.querySelector('.titletext')
        titletext.innerHTML += `Theraphy #${sessionStorage.getItem('number_of_therapy')} of ${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')}`
    }
}

const submit_posttherapy = document.querySelector('#submit-posttherapy');
submit_posttherapy.addEventListener('click', () => {
    // get all values then post request
    const patient_id = parseInt(sessionStorage.getItem('patient_code'));
    const therapy_id = parseInt(sessionStorage.getItem('therapy_id'));
    const date_post_therapy = document.querySelector('#p3-dateposttherapy').value;
    const pts_hour = document.querySelector('#p3-hour').value;
    const with_spect = (document.querySelector('#p3-withspect').checked) ? true : ((document.querySelector('#p3-withoutspect').checked)? false : null);
    const lesion_prostate = document.querySelector('#p3-prostate').checked;
    const lesion_lymph= document.querySelector('#p3-lymph').checked;
    const lesion_bones= document.querySelector('#p3-bones').checked;
    const lesion_lungs= document.querySelector('#p3-lungs').checked;
    const lesion_liver= document.querySelector('#p3-liver').checked;
    const dosimetry_saliva = parseFloat(document.querySelector('#p3-dossaliva').value);
    const dosimetry_kidney_left = parseFloat(document.querySelector('#p3-doskidl').value);
    const dosimetry_kidney_right = parseFloat(document.querySelector('#p3-doskidr').value);
    fetch('/request/add-patient/post-therapy', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            patient_id: patient_id,
            therapy_id: therapy_id,
            date_post_therapy: date_post_therapy,
            pts_hour: pts_hour,
            with_spect: with_spect,
            lesion_prostate: lesion_prostate,
            lesion_lymph: lesion_lymph,
            lesion_bones: lesion_bones,
            lesion_lungs: lesion_lungs,
            lesion_liver: lesion_liver,
            dosimetry_saliva: dosimetry_saliva,
            dosimetry_kidney_left: dosimetry_kidney_left,
            dosimetry_kidney_right: dosimetry_kidney_right
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if (data[0].event == 'success') {
            alert(`Post-Theraphy information for Therapy #${sessionStorage.getItem('number_of_therapy')} ${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')} added successfully.`)
            location.href = '/view-patient'
        }
        else if (data[0].event == 'fill') {
            alert('Fill all fields')
        }
        else alert('Error occurred while adding post-therapy')
    })
})
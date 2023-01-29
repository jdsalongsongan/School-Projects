window.onload = () => {
    if (sessionStorage.getItem('user') === undefined || sessionStorage.getItem('user') === null) {
        location.href = '/login'
    }
    if(sessionStorage.getItem('patient_code') == null) location.href = '/'
    else {
        const titletext = document.querySelector('.titletext')
        titletext.innerHTML += ` ${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')}`
    }
}

const sg_opt_obs = document.querySelector('.sg-opt-obs');
const sg_normal = document.querySelector('#sg-normal');
const sg_obstructed = document.querySelector('#sg-obstructed');

sg_normal.addEventListener('click', () => {
    const sg_obs_left = document.querySelector('#sg-obs-left');
    const sg_obs_right = document.querySelector('#sg-obs-right');
    sg_obs_left.checked = false;
    sg_obs_right.checked = false;
    sg_opt_obs.style.display = 'none';
})

sg_obstructed.addEventListener('click', () => {
    const sg_obs_left = document.querySelector('#sg-obs-left');
    const sg_obs_right = document.querySelector('#sg-obs-right');
    sg_obs_left.checked = false;
    sg_obs_right.checked = false;
    sg_opt_obs.style.display = 'block';
})

const bm_opt_obs = document.querySelector('.bm-opt-obs');
const bm_no = document.querySelector('#bm-no');
const bm_with = document.querySelector('#bm-with');

bm_no.addEventListener('click', () => {
    const p1_metastasisloc = document.querySelector('#p1-metastasisloc');
    p1_metastasisloc.value = '';
    bm_opt_obs.style.display = 'none';
})

bm_with.addEventListener('click', () => {
    const p1_metastasisloc = document.querySelector('#p1-metastasisloc');
    p1_metastasisloc.value = '';
    bm_opt_obs.style.display = 'block';
})

const gaf_opt_obs = document.querySelectorAll('.gaf-opt-obs');
const la_ga = document.querySelector('#la-ga');
const la_f18 = document.querySelector('#la-f18');
const la_none = document.querySelector('#la-none');

la_ga.addEventListener('click', () => {
    gaf_opt_obs.forEach((la) => {
        la.style.display = 'block';
    })

    const la_pros_opt_obs = document.querySelector('.la-pros-opt-obs');
    const la_lymph_opt_obs = document.querySelector('.la-lymph-opt-obs');
    const la_bone_opt_obs = document.querySelector('.la-bone-opt-obs');
    const la_brain_opt_obs = document.querySelector('.la-brain-opt-obs');
    const la_lung_opt_obs = document.querySelector('.la-lung-opt-obs');
    const la_liver_opt_obs = document.querySelector('.la-liver-opt-obs');
    const la_other_opt_obs = document.querySelector('.la-other-opt-obs');

    const la_pros_absent = document.querySelector('#la-pros-absent');
    const la_pros_present = document.querySelector('#la-pros-present');
    const la_lymph_absent = document.querySelector('#la-lymph-absent');
    const la_lymph_present = document.querySelector('#la-lymph-present');
    const la_bone_absent = document.querySelector('#la-bone-absent');
    const la_bone_present = document.querySelector('#la-bone-present');
    const la_brain_absent = document.querySelector('#la-brain-absent');
    const la_brain_present = document.querySelector('#la-brain-present');
    const la_lung_absent = document.querySelector('#la-lung-absent');
    const la_lung_present = document.querySelector('#la-lung-present');
    const la_liver_absent = document.querySelector('#la-liver-absent');
    const la_liver_present = document.querySelector('#la-liver-present');
    const la_other_absent = document.querySelector('#la-other-absent');
    const la_other_present = document.querySelector('#la-other-present');

    la_pros_absent.addEventListener('click', () => {
        la_pros_opt_obs.style.display = 'none'
    })
    la_pros_present.addEventListener('click', () => {
        la_pros_opt_obs.style.display = 'block'
    })
    la_lymph_absent.addEventListener('click', () => {
        la_lymph_opt_obs.style.display = 'none'
    })
    la_lymph_present.addEventListener('click', () => {
        la_lymph_opt_obs.style.display = 'block'
    })
    la_bone_absent.addEventListener('click', () => {
        la_bone_opt_obs.style.display = 'none'
    })
    la_bone_present.addEventListener('click', () => {
        la_bone_opt_obs.style.display = 'block'
    })
    la_brain_absent.addEventListener('click', () => {
        la_brain_opt_obs.style.display = 'none'
    })
    la_brain_present.addEventListener('click', () => {
        la_brain_opt_obs.style.display = 'block'
    })
    la_lung_absent.addEventListener('click', () => {
        la_lung_opt_obs.style.display = 'none'
    })
    la_lung_present.addEventListener('click', () => {
        la_lung_opt_obs.style.display = 'block'
    })
    la_liver_absent.addEventListener('click', () => {
        la_liver_opt_obs.style.display = 'none'
    })
    la_liver_present.addEventListener('click', () => {
        la_liver_opt_obs.style.display = 'block'
    })
    la_other_absent.addEventListener('click', () => {
        la_other_opt_obs.style.display = 'none'
    })
    la_other_present.addEventListener('click', () => {
        la_other_opt_obs.style.display = 'block'
    })
})

la_f18.addEventListener('click', () => {
    gaf_opt_obs.forEach((la) => {
        la.style.display = 'block';
    })

    const la_pros_opt_obs = document.querySelector('.la-pros-opt-obs');
    const la_lymph_opt_obs = document.querySelector('.la-lymph-opt-obs');
    const la_bone_opt_obs = document.querySelector('.la-bone-opt-obs');
    const la_brain_opt_obs = document.querySelector('.la-brain-opt-obs');
    const la_lung_opt_obs = document.querySelector('.la-lung-opt-obs');
    const la_liver_opt_obs = document.querySelector('.la-liver-opt-obs');
    const la_other_opt_obs = document.querySelector('.la-other-opt-obs');

    const la_pros_absent = document.querySelector('#la-pros-absent');
    const la_pros_present = document.querySelector('#la-pros-present');
    const la_lymph_absent = document.querySelector('#la-lymph-absent');
    const la_lymph_present = document.querySelector('#la-lymph-present');
    const la_bone_absent = document.querySelector('#la-bone-absent');
    const la_bone_present = document.querySelector('#la-bone-present');
    const la_brain_absent = document.querySelector('#la-brain-absent');
    const la_brain_present = document.querySelector('#la-brain-present');
    const la_lung_absent = document.querySelector('#la-lung-absent');
    const la_lung_present = document.querySelector('#la-lung-present');
    const la_liver_absent = document.querySelector('#la-liver-absent');
    const la_liver_present = document.querySelector('#la-liver-present');
    const la_other_absent = document.querySelector('#la-other-absent');
    const la_other_present = document.querySelector('#la-other-present');

    la_pros_absent.addEventListener('click', () => {
        la_pros_opt_obs.style.display = 'none'
    })
    la_pros_present.addEventListener('click', () => {
        la_pros_opt_obs.style.display = 'block'
    })
    la_lymph_absent.addEventListener('click', () => {
        la_lymph_opt_obs.style.display = 'none'
    })
    la_lymph_present.addEventListener('click', () => {
        la_lymph_opt_obs.style.display = 'block'
    })
    la_bone_absent.addEventListener('click', () => {
        la_bone_opt_obs.style.display = 'none'
    })
    la_bone_present.addEventListener('click', () => {
        la_bone_opt_obs.style.display = 'block'
    })
    la_brain_absent.addEventListener('click', () => {
        la_brain_opt_obs.style.display = 'none'
    })
    la_brain_present.addEventListener('click', () => {
        la_brain_opt_obs.style.display = 'block'
    })
    la_lung_absent.addEventListener('click', () => {
        la_lung_opt_obs.style.display = 'none'
    })
    la_lung_present.addEventListener('click', () => {
        la_lung_opt_obs.style.display = 'block'
    })
    la_liver_absent.addEventListener('click', () => {
        la_liver_opt_obs.style.display = 'none'
    })
    la_liver_present.addEventListener('click', () => {
        la_liver_opt_obs.style.display = 'block'
    })
    la_other_absent.addEventListener('click', () => {
        la_other_opt_obs.style.display = 'none'
    })
    la_other_present.addEventListener('click', () => {
        la_other_opt_obs.style.display = 'block'
    })
})

la_none.addEventListener('click', () => {
    gaf_opt_obs.forEach((la) => {
        la.style.display = 'none';
    })
})

const fdg_opt_obs = document.querySelectorAll('.fdg-opt-obs');
const lb_fdg = document.querySelector('#lb-fdg');
const lb_none = document.querySelector('#lb-none');

lb_fdg.addEventListener('click', () => {
    fdg_opt_obs.forEach((lb) => {
        lb.style.display = 'block';
    })

    const lb_pros_opt_obs = document.querySelector('.lb-pros-opt-obs');
    const lb_lymph_opt_obs = document.querySelector('.lb-lymph-opt-obs');
    const lb_bone_opt_obs = document.querySelector('.lb-bone-opt-obs');
    const lb_brain_opt_obs = document.querySelector('.lb-brain-opt-obs');
    const lb_lung_opt_obs = document.querySelector('.lb-lung-opt-obs');
    const lb_liver_opt_obs = document.querySelector('.lb-liver-opt-obs');
    const lb_other_opt_obs = document.querySelector('.lb-other-opt-obs');

    const lb_pros_absent = document.querySelector('#lb-pros-absent');
    const lb_pros_present = document.querySelector('#lb-pros-present');
    const lb_lymph_absent = document.querySelector('#lb-lymph-absent');
    const lb_lymph_present = document.querySelector('#lb-lymph-present');
    const lb_bone_absent = document.querySelector('#lb-bone-absent');
    const lb_bone_present = document.querySelector('#lb-bone-present');
    const lb_brain_absent = document.querySelector('#lb-brain-absent');
    const lb_brain_present = document.querySelector('#lb-brain-present');
    const lb_lung_absent = document.querySelector('#lb-lung-absent');
    const lb_lung_present = document.querySelector('#lb-lung-present');
    const lb_liver_absent = document.querySelector('#lb-liver-absent');
    const lb_liver_present = document.querySelector('#lb-liver-present');
    const lb_other_absent = document.querySelector('#lb-other-absent');
    const lb_other_present = document.querySelector('#lb-other-present');

    lb_pros_absent.addEventListener('click', () => {
        lb_pros_opt_obs.style.display = 'none'
    })
    lb_pros_present.addEventListener('click', () => {
        lb_pros_opt_obs.style.display = 'block'
    })
    lb_lymph_absent.addEventListener('click', () => {
        lb_lymph_opt_obs.style.display = 'none'
    })
    lb_lymph_present.addEventListener('click', () => {
        lb_lymph_opt_obs.style.display = 'block'
    })
    lb_bone_absent.addEventListener('click', () => {
        lb_bone_opt_obs.style.display = 'none'
    })
    lb_bone_present.addEventListener('click', () => {
        lb_bone_opt_obs.style.display = 'block'
    })
    lb_brain_absent.addEventListener('click', () => {
        lb_brain_opt_obs.style.display = 'none'
    })
    lb_brain_present.addEventListener('click', () => {
        lb_brain_opt_obs.style.display = 'block'
    })
    lb_lung_absent.addEventListener('click', () => {
        lb_lung_opt_obs.style.display = 'none'
    })
    lb_lung_present.addEventListener('click', () => {
        lb_lung_opt_obs.style.display = 'block'
    })
    lb_liver_absent.addEventListener('click', () => {
        lb_liver_opt_obs.style.display = 'none'
    })
    lb_liver_present.addEventListener('click', () => {
        lb_liver_opt_obs.style.display = 'block'
    })
    lb_other_absent.addEventListener('click', () => {
        lb_other_opt_obs.style.display = 'none'
    })
    lb_other_present.addEventListener('click', () => {
        lb_other_opt_obs.style.display = 'block'
    })
})

lb_none.addEventListener('click', () => {
    fdg_opt_obs.forEach((lb) => {
        lb.style.display = 'none';
    })
})

const submit_button = document.querySelector('#submit-info')

submit_button.addEventListener('click', () => {
    //cant be ''
    const patient_id = sessionStorage.getItem('patient_code')
    const follow_up_date = document.querySelector('#p4-followupdate').value
    const psa = document.querySelector('#p1-psa').value
    const creatinine = document.querySelector('#p1-creatinine').value
    const wbc = document.querySelector('#p1-wbc').value
    const rbc = document.querySelector('#p1-rbc').value
    const hemoglobin = document.querySelector('#p1-hemoglobin').value
    const hematocrit = document.querySelector('#p1-hematocrit').value
    const platelet_count = document.querySelector('#p1-platelet').value
    const lactate_dehydrogenase = document.querySelector('#p1-lactate').value
    const alkaline_phosphatase = document.querySelector('#p1-alkaline').value
    const sgpt_sgot_bilirubins = document.querySelector('#p1-sgpt').value
    const normal_salivary_gland = (document.querySelector('#sg-normal').checked) ? true : ((document.querySelector('#sg-obstructed').checked) ? false : null) //cant be null
    const right_obstruction = (!document.querySelector('#sg-obstructed').checked) ? null : ((document.querySelector('#sg-obs-right').checked) ? true : false)
    const left_obstruction = (!document.querySelector('#sg-obstructed').checked) ? null : ((document.querySelector('#sg-obs-left').checked) ? true : false) //cant be both false
    const renal_scintigraphy = (document.querySelector('#p1-renalscintigraphy').value === 'none') ? '' : document.querySelector('#p1-renalscintigraphy').value;
    const bone_scan = (document.querySelector('#bm-no').checked) ? false : ((document.querySelector('#bm-with').checked) ? true : null) //cant be null
    const metastasis_location = (document.querySelector('#bm-with').checked) ? document.querySelector('#p1-metastasisloc').value : null //cant be ''
    const lesion_ga_psma = (document.querySelector('#la-ga').checked) ? 'Ga-68' : ((document.querySelector('#la-f18').checked) ? 'F-18 PSMA' : ((document.querySelector('#la-none').checked) ? null : '')) //cant be ''
    const lesion_prostate_a = (lesion_ga_psma != null) ? ((document.querySelector('#la-pros-present').checked) ? true : ((document.querySelector('#la-pros-absent').checked) ? false : '')) : null
    const lesion_prostate_a_location = (lesion_ga_psma != null) ? ((document.querySelector('#la-pros-present').checked) ? document.querySelector('#lesiona-pros-location').value : null) : null
    const lesion_prostate_a_suv = (lesion_ga_psma != null) ? ((document.querySelector('#la-pros-present').checked) ? document.querySelector('#lesiona-pros-suv').value : null) : null
    const lesion_prostate_a_measurement = (lesion_ga_psma != null) ? ((document.querySelector('#la-pros-present').checked) ? document.querySelector('#lesiona-pros-measurement').value : null) : null
    const lesion_lymph_a = (lesion_ga_psma != null) ? ((document.querySelector('#la-lymph-present').checked) ? true : ((document.querySelector('#la-lymph-absent').checked) ? false : '')) : null
    const lesion_lymph_a_location = (lesion_ga_psma != null) ? ((document.querySelector('#la-lymph-present').checked) ? document.querySelector('#lesiona-lymph-location').value : null) : null
    const lesion_lymph_a_suv = (lesion_ga_psma != null) ? ((document.querySelector('#la-lymph-present').checked) ? document.querySelector('#lesiona-lymph-suv').value : null) : null
    const lesion_lymph_a_measurement = (lesion_ga_psma != null) ? ((document.querySelector('#la-lymph-present').checked) ? document.querySelector('#lesiona-lymph-measurement').value : null) : null
    const lesion_bone_a = (lesion_ga_psma != null) ? ((document.querySelector('#la-bone-present').checked) ? true : ((document.querySelector('#la-bone-absent').checked) ? false : '')) : null
    const lesion_bone_a_location = (lesion_ga_psma != null) ? ((document.querySelector('#la-bone-present').checked) ? document.querySelector('#lesiona-bone-location').value : null) : null
    const lesion_bone_a_suv = (lesion_ga_psma != null) ? ((document.querySelector('#la-bone-present').checked) ? document.querySelector('#lesiona-bone-suv').value : null) : null
    const lesion_bone_a_measurement = (lesion_ga_psma != null) ? ((document.querySelector('#la-bone-present').checked) ? document.querySelector('#lesiona-bone-measurement').value : null) : null
    const lesion_brain_a = (lesion_ga_psma != null) ? ((document.querySelector('#la-brain-present').checked) ? true : ((document.querySelector('#la-brain-absent').checked) ? false : '')) : null
    const lesion_brain_a_location = (lesion_ga_psma != null) ? ((document.querySelector('#la-brain-present').checked) ? document.querySelector('#lesiona-brain-location').value : null) : null
    const lesion_brain_a_suv = (lesion_ga_psma != null) ? ((document.querySelector('#la-brain-present').checked) ? document.querySelector('#lesiona-brain-suv').value : null) : null
    const lesion_brain_a_measurement = (lesion_ga_psma != null) ? ((document.querySelector('#la-brain-present').checked) ? document.querySelector('#lesiona-brain-measurement').value : null) : null
    const lesion_lungs_a = (lesion_ga_psma != null) ? ((document.querySelector('#la-lung-present').checked) ? true : ((document.querySelector('#la-lung-absent').checked) ? false : '')) : null
    const lesion_lungs_a_location = (lesion_ga_psma != null) ? ((document.querySelector('#la-lung-present').checked) ? document.querySelector('#lesiona-lung-location').value : null) : null
    const lesion_lungs_a_suv = (lesion_ga_psma != null) ? ((document.querySelector('#la-lung-present').checked) ? document.querySelector('#lesiona-lung-suv').value : null) : null
    const lesion_lungs_a_measurement = (lesion_ga_psma != null) ? ((document.querySelector('#la-lung-present').checked) ? document.querySelector('#lesiona-lung-measurement').value : null) : null
    const lesion_liver_a = (lesion_ga_psma != null) ? ((document.querySelector('#la-liver-present').checked) ? true : ((document.querySelector('#la-liver-absent').checked) ? false : '')) : null
    const lesion_liver_a_location = (lesion_ga_psma != null) ? ((document.querySelector('#la-liver-present').checked) ? document.querySelector('#lesiona-liver-location').value : null) : null
    const lesion_liver_a_suv = (lesion_ga_psma != null) ? ((document.querySelector('#la-liver-present').checked) ? document.querySelector('#lesiona-liver-suv').value : null) : null
    const lesion_liver_a_measurement = (lesion_ga_psma != null) ? ((document.querySelector('#la-liver-present').checked) ? document.querySelector('#lesiona-liver-measurement').value : null) : null
    const lesion_others_a = (lesion_ga_psma != null) ? ((document.querySelector('#la-other-present').checked) ? true : ((document.querySelector('#la-other-absent').checked) ? false : '')) : null
    const lesion_others_a_location = (lesion_ga_psma != null) ? ((document.querySelector('#la-other-present').checked) ? document.querySelector('#lesiona-other-location').value : null) : null
    const lesion_others_a_suv = (lesion_ga_psma != null) ? ((document.querySelector('#la-other-present').checked) ? document.querySelector('#lesiona-other-suv').value : null) : null
    const lesion_others_a_measurement = (lesion_ga_psma != null) ? ((document.querySelector('#la-other-present').checked) ? document.querySelector('#lesiona-other-measurement').value : null) : null
    const lesion_fdg_ctr = (document.querySelector('#lb-fdg').checked) ? true : ((document.querySelector('#lb-none').checked) ? false : '')
    const lesion_prostate_b = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-pros-present').checked) ? true : ((document.querySelector('#lb-pros-absent').checked) ? false : '')) : null
    const lesion_prostate_b_location = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-pros-present').checked) ? document.querySelector('#lesionb-pros-location').value : null) : null
    const lesion_prostate_b_suv = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-pros-present').checked) ? document.querySelector('#lesionb-pros-suv').value : null) : null
    const lesion_prostate_b_measurement = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-pros-present').checked) ? document.querySelector('#lesionb-pros-measurement').value : null) : null
    const lesion_lymph_b = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lymph-present').checked) ? true : ((document.querySelector('#lb-lymph-absent').checked) ? false : '')) : null
    const lesion_lymph_b_location = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lymph-present').checked) ? document.querySelector('#lesionb-lymph-location').value : null) : null
    const lesion_lymph_b_suv = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lymph-present').checked) ? document.querySelector('#lesionb-lymph-suv').value : null) : null
    const lesion_lymph_b_measurement = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lymph-present').checked) ? document.querySelector('#lesionb-lymph-measurement').value : null) : null
    const lesion_bone_b = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-bone-present').checked) ? true : ((document.querySelector('#lb-bone-absent').checked) ? false : '')) : null
    const lesion_bone_b_location = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-bone-present').checked) ? document.querySelector('#lesionb-bone-location').value : null) : null
    const lesion_bone_b_suv = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-bone-present').checked) ? document.querySelector('#lesionb-bone-suv').value : null) : null
    const lesion_bone_b_measurement = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-bone-present').checked) ? document.querySelector('#lesionb-bone-measurement').value : null) : null
    const lesion_brain_b = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-brain-present').checked) ? true : ((document.querySelector('#lb-brain-absent').checked) ? false : '')) : null
    const lesion_brain_b_location = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-brain-present').checked) ? document.querySelector('#lesionb-brain-location').value : null) : null
    const lesion_brain_b_suv = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-brain-present').checked) ? document.querySelector('#lesionb-brain-suv').value : null) : null
    const lesion_brain_b_measurement = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-brain-present').checked) ? document.querySelector('#lesionb-brain-measurement').value : null) : null
    const lesion_lungs_b = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lung-present').checked) ? true : ((document.querySelector('#lb-lung-absent').checked) ? false : '')) : null
    const lesion_lungs_b_location = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lung-present').checked) ? document.querySelector('#lesionb-lung-location').value : null) : null
    const lesion_lungs_b_suv = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lung-present').checked) ? document.querySelector('#lesionb-lung-suv').value : null) : null
    const lesion_lungs_b_measurement = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-lung-present').checked) ? document.querySelector('#lesionb-lung-measurement').value : null) : null
    const lesion_liver_b = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-liver-present').checked) ? true : ((document.querySelector('#lb-liver-absent').checked) ? false : '')) : null
    const lesion_liver_b_location = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-liver-present').checked) ? document.querySelector('#lesionb-liver-location').value : null) : null
    const lesion_liver_b_suv = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-liver-present').checked) ? document.querySelector('#lesionb-liver-suv').value : null) : null
    const lesion_liver_b_measurement = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-liver-present').checked) ? document.querySelector('#lesionb-liver-measurement').value : null) : null
    const lesion_others_b = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-other-present').checked) ? true : ((document.querySelector('#lb-other-absent').checked) ? false : '')) : null
    const lesion_others_b_location = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-other-present').checked) ? document.querySelector('#lesionb-other-location').value : null) : null
    const lesion_others_b_suv = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-other-present').checked) ? document.querySelector('#lesionb-other-suv').value : null) : null
    const lesion_others_b_measurement = ((lesion_fdg_ctr == '')? false : ((lesion_fdg_ctr)? true: false)) ? ((document.querySelector('#lb-other-present').checked) ? document.querySelector('#lesionb-other-measurement').value : null) : null
    const assessment = (document.querySelector('#p1-assessment').value === 'none') ? '' : document.querySelector('#p1-assessment').value;
    const plan = document.querySelector('#p1-plan').value

    //rules
    //check if empty string

    //special rules
    const sg_check = !(normal_salivary_gland == null)
    const sg_obs_check = !(right_obstruction == false && left_obstruction == false)
    const bone_check = !(bone_scan == null)
    
    if (sg_check && sg_obs_check && bone_check) {
        fetch('/request/add-patient/follow-up', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                patient_id: patient_id,
                follow_up_date: follow_up_date,
                psa: psa,
                creatinine: creatinine,
                wbc: wbc,
                rbc: rbc,
                hemoglobin: hemoglobin,
                hematocrit: hematocrit,
                platelet_count: platelet_count,
                lactate_dehydrogenase: lactate_dehydrogenase,
                alkaline_phosphatase: alkaline_phosphatase,
                sgpt_sgot_bilirubins: sgpt_sgot_bilirubins,
                normal_salivary_gland: normal_salivary_gland,
                right_obstruction: right_obstruction,
                left_obstruction: left_obstruction,
                renal_scintigraphy: renal_scintigraphy,
                bone_scan: bone_scan,
                metastasis_location: metastasis_location,
                lesion_ga_psma: lesion_ga_psma,
                lesion_prostate_a: lesion_prostate_a,
                lesion_prostate_a_location: lesion_prostate_a_location,
                lesion_prostate_a_suv: lesion_prostate_a_suv,
                lesion_prostate_a_measurement: lesion_prostate_a_measurement,
                lesion_lymph_a: lesion_lymph_a,
                lesion_lymph_a_location: lesion_lymph_a_location,
                lesion_lymph_a_suv: lesion_lymph_a_suv,
                lesion_lymph_a_measurement: lesion_lymph_a_measurement,
                lesion_bone_a: lesion_bone_a,
                lesion_bone_a_location: lesion_bone_a_location,
                lesion_bone_a_suv: lesion_bone_a_suv,
                lesion_bone_a_measurement: lesion_bone_a_measurement,
                lesion_brain_a: lesion_brain_a,
                lesion_brain_a_location: lesion_brain_a_location,
                lesion_brain_a_suv: lesion_brain_a_suv,
                lesion_brain_a_measurement: lesion_brain_a_measurement,
                lesion_lungs_a: lesion_lungs_a,
                lesion_lungs_a_location: lesion_lungs_a_location,
                lesion_lungs_a_suv: lesion_lungs_a_suv,
                lesion_lungs_a_measurement: lesion_lungs_a_measurement,
                lesion_liver_a: lesion_liver_a,
                lesion_liver_a_location: lesion_liver_a_location,
                lesion_liver_a_suv: lesion_liver_a_suv,
                lesion_liver_a_measurement: lesion_liver_a_measurement,
                lesion_others_a: lesion_others_a,
                lesion_others_a_location: lesion_others_a_location,
                lesion_others_a_suv: lesion_others_a_suv,
                lesion_others_a_measurement: lesion_others_a_measurement,
                lesion_fdg_ctr: lesion_fdg_ctr,
                lesion_prostate_b: lesion_prostate_b,
                lesion_prostate_b_location: lesion_prostate_b_location,
                lesion_prostate_b_suv: lesion_prostate_b_suv,
                lesion_prostate_b_measurement: lesion_prostate_b_measurement,
                lesion_lymph_b: lesion_lymph_b,
                lesion_lymph_b_location: lesion_lymph_b_location,
                lesion_lymph_b_suv: lesion_lymph_b_suv,
                lesion_lymph_b_measurement: lesion_lymph_b_measurement,
                lesion_bone_b: lesion_bone_b,
                lesion_bone_b_location: lesion_bone_b_location,
                lesion_bone_b_suv: lesion_bone_b_suv,
                lesion_bone_b_measurement: lesion_bone_b_measurement,
                lesion_brain_b: lesion_brain_b,
                lesion_brain_b_location: lesion_brain_b_location,
                lesion_brain_b_suv: lesion_brain_b_suv,
                lesion_brain_b_measurement: lesion_brain_b_measurement,
                lesion_lungs_b: lesion_lungs_b,
                lesion_lungs_b_location: lesion_lungs_b_location,
                lesion_lungs_b_suv: lesion_lungs_b_suv,
                lesion_lungs_b_measurement: lesion_lungs_b_measurement,
                lesion_liver_b: lesion_liver_b,
                lesion_liver_b_location: lesion_liver_b_location,
                lesion_liver_b_suv: lesion_liver_b_suv,
                lesion_liver_b_measurement: lesion_liver_b_measurement,
                lesion_others_b: lesion_others_b,
                lesion_others_b_location: lesion_others_b_location,
                lesion_others_b_suv: lesion_others_b_suv,
                lesion_others_b_measurement: lesion_others_b_measurement,
                assessment: assessment,
                plan: plan
            })
        })
        .then((res) => res.json())
        .then(data => {
            if (data[0].event == 'success') {
                alert(`Follow-up of Patient ${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')} added successfully`) 
                location.href = '/'
            }
            else if (data[0].event == 'fill') {
                alert('Fill all fields')
            }
            else alert('Error occurred while adding follow-up')
        })   
    }
    else {
        alert('Fill all fields')
    }
})
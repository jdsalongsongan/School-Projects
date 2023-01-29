const express = require('express');
const db = require('../database/connection');
const CryptoJS = require('crypto-js');
const router = express.Router();

router.post('/add-patient', (req, res) => {
    const { first_name,
        last_name,
        age,
        city_of_residence,
        date_of_diagnosis,
        date_of_surgery,
        histopath_result,
        gleason_score,
        date_of_treatment,
        treatment_type,
        ecog_score,
        ht,
        wt,
        bmi,
        bp,
        hr,
        pain_score,
        local_symptoms,
        systemic_symptoms,
        psa,
        creatinine,
        wbc,
        rbc,
        hemoglobin,
        hematocrit,
        platelet_count,
        lactate_dehydrogenase,
        alkaline_phosphatase,
        sgpt_sgot_bilirubins,
        normal_salivary_gland,
        right_obstruction,
        left_obstruction,
        renal_scintigraphy,
        bone_scan,
        metastasis_location,
        lesion_ga_psma,
        lesion_prostate_a,
        lesion_prostate_a_location,
        lesion_prostate_a_suv,
        lesion_prostate_a_measurement,
        lesion_lymph_a,
        lesion_lymph_a_location,
        lesion_lymph_a_suv,
        lesion_lymph_a_measurement,
        lesion_bone_a,
        lesion_bone_a_location,
        lesion_bone_a_suv,
        lesion_bone_a_measurement,
        lesion_brain_a,
        lesion_brain_a_location,
        lesion_brain_a_suv,
        lesion_brain_a_measurement,
        lesion_lungs_a,
        lesion_lungs_a_location,
        lesion_lungs_a_suv,
        lesion_lungs_a_measurement,
        lesion_liver_a,
        lesion_liver_a_location,
        lesion_liver_a_suv,
        lesion_liver_a_measurement,
        lesion_others_a,
        lesion_others_a_location,
        lesion_others_a_suv,
        lesion_others_a_measurement,
        lesion_fdg_ctr,
        lesion_prostate_b,
        lesion_prostate_b_location,
        lesion_prostate_b_suv,
        lesion_prostate_b_measurement,
        lesion_lymph_b,
        lesion_lymph_b_location,
        lesion_lymph_b_suv,
        lesion_lymph_b_measurement,
        lesion_bone_b,
        lesion_bone_b_location,
        lesion_bone_b_suv,
        lesion_bone_b_measurement,
        lesion_brain_b,
        lesion_brain_b_location,
        lesion_brain_b_suv,
        lesion_brain_b_measurement,
        lesion_lungs_b,
        lesion_lungs_b_location,
        lesion_lungs_b_suv,
        lesion_lungs_b_measurement,
        lesion_liver_b,
        lesion_liver_b_location,
        lesion_liver_b_suv,
        lesion_liver_b_measurement,
        lesion_others_b,
        lesion_others_b_location,
        lesion_others_b_suv,
        lesion_others_b_measurement,
        assessment,
        plan } = req.body;
    const lesion_check = (lesion_prostate_a) ? (lesion_prostate_a_location != '' && lesion_prostate_a_measurement != '' &&
        lesion_prostate_a_suv != '') : true && (lesion_lymph_a) ? (lesion_lymph_a_location != '' && lesion_lymph_a_measurement != '' && lesion_lymph_a_suv != '') : true &&
        (lesion_bone_a) ? (lesion_bone_a_location != '' && lesion_bone_a_measurement != '' && lesion_bone_a_suv != '') : true &&
        (lesion_brain_a) ? (lesion_brain_a_location != '' && lesion_brain_a_measurement != '' && lesion_brain_a_suv != '') : true &&
        (lesion_lungs_a) ? (lesion_lungs_a_location != '' && lesion_lungs_a_measurement != '' && lesion_lungs_a_suv != '') : true &&
        (lesion_liver_a) ? (lesion_liver_a_location != '' && lesion_liver_a_measurement != '' && lesion_liver_a_suv != '') : true &&
        (lesion_others_a) ? (lesion_others_a_location != '' && lesion_others_a_measurement != '' && lesion_others_a_suv != '') : true &&
        (lesion_prostate_b) ? (lesion_prostate_b_location != '' && lesion_prostate_b_measurement != '' &&
        lesion_prostate_b_suv != '') : true && (lesion_lymph_b != '') ? (lesion_lymph_b_location != '' && lesion_lymph_b_measurement != '' && lesion_lymph_b_suv != '') : true &&
        (lesion_bone_b != '') ? (lesion_bone_b_location != '' && lesion_bone_b_measurement != '' && lesion_bone_b_suv != '') : true &&
        (lesion_brain_b) ? (lesion_brain_b_location != '' && lesion_brain_b_measurement != '' && lesion_brain_b_suv != '') : true &&
        (lesion_lungs_b) ? (lesion_lungs_b_location != '' && lesion_lungs_b_measurement != '' && lesion_lungs_b_suv != '') : true &&
        (lesion_liver_b) ? (lesion_liver_b_location != '' && lesion_liver_b_measurement != '' && lesion_liver_b_suv != '') : true &&
        (lesion_others_b) ? (lesion_others_b_location != '' && lesion_others_b_measurement != '' && lesion_others_b_suv != '') : true

    const empty_check = first_name != '' && last_name != '' && age != '' && date_of_diagnosis != '' && date_of_surgery != '' && histopath_result != '' && gleason_score != '' && date_of_treatment != '' && treatment_type != '' && ecog_score != '' &&
        ht != '' && wt != '' && bmi != '' && bp != '' && hr != '' && pain_score != '' && local_symptoms != '' && systemic_symptoms != '' && psa != '' && creatinine != '' && wbc != '' && rbc != '' && hemoglobin != '' && hematocrit != '' && platelet_count != '' &&
        lactate_dehydrogenase != '' && alkaline_phosphatase != '' && sgpt_sgot_bilirubins != '' && renal_scintigraphy != '' && metastasis_location != '' && lesion_ga_psma != '' && ((typeof lesion_fdg_ctr === 'string') ? false : true) && assessment != '' && plan != '' && city_of_residence != ''

    if (lesion_check && empty_check) {
        db('part1').insert({
            first_name: first_name,
            last_name: last_name,
            age: age,
            city_of_residence: city_of_residence,
            date_of_diagnosis: date_of_diagnosis,
            date_of_surgery: date_of_surgery,
            histopath_result: histopath_result,
            gleason_score: gleason_score,
            date_of_treatment: date_of_treatment,
            treatment_type: treatment_type,
            ecog_score: ecog_score,
            ht: ht,
            wt: wt,
            bmi: bmi,
            bp: bp,
            hr: hr,
            pain_score: pain_score,
            local_symptoms: local_symptoms,
            systemic_symptoms: systemic_symptoms,
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
            lesion_fdg_ct: lesion_fdg_ctr,
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
            .then(() => {
                res.json([{ 'event': 'success' }])

            })
            .catch((err) => {
                res.json([{ 'event': 'error' }])
            })
    }
    else {
        res.json([{ 'event': 'fill' }])
    }
})

router.post('/add-patient/therapy', (req, res) => {
    const { patient_id, date_radioligand, meds, pre_meds, p2_bp, p2_hr,
        p2_rr, oxygen_sat, date_therapy, radiopharm, activity,
        have_fatigue, have_nausea_vomitting, have_dry_lipmouth,
        have_headache, have_bone_pain, other_side_effect } = req.body;

    const blank_check = (patient_id != null || patient_id != undefined) && date_radioligand != '' &&
        meds != '' && pre_meds != '' && p2_bp != '' && p2_hr != '' && p2_rr != '' && oxygen_sat != '' &&
        date_therapy != '' && radiopharm != '' && activity != ''

    if (blank_check) {
        db('part2').insert({
            patient_id: patient_id,
            date_radioligand: date_radioligand,
            meds: meds,
            pre_meds: pre_meds,
            p2_bp: p2_bp,
            p2_hr: p2_hr,
            p2_rr: p2_rr,
            oxygen_sat: oxygen_sat,
            date_therapy: date_therapy,
            radiopharm: radiopharm,
            activity: activity,
            have_fatigue: have_fatigue,
            have_nausea_vomitting: have_nausea_vomitting,
            have_dry_lipmouth: have_dry_lipmouth,
            have_headache: have_headache,
            have_bone_pain: have_bone_pain,
            other_side_effect: other_side_effect
        })
            .then(() => {
                res.json([{ 'event': 'success' }])

            })
            .catch((err) => {
                res.json([{ 'event': 'error' }])
            })
    }
    else {
        res.json([{ 'event': 'fill' }])
    }
})

router.post('/add-patient/post-therapy', (req, res) => {
    const { patient_id, therapy_id, date_post_therapy, pts_hour,
        with_spect, lesion_prostate, lesion_lymph,
        lesion_lungs, lesion_bones, lesion_liver,
        dosimetry_saliva, dosimetry_kidney_left,
        dosimetry_kidney_right } = req.body

    const blank_check = (patient_id != null || patient_id != undefined) && (therapy_id != null || therapy_id != undefined) &&
        date_post_therapy != '' && with_spect != null && dosimetry_saliva != null && dosimetry_kidney_left != null &&
        dosimetry_kidney_right != null
    if (blank_check) {
        db('part3')
            .insert({
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
            .then(() => {
                res.json([{ 'event': 'success' }])

            })
            .catch((err) => {
                res.json([{ 'event': 'error' }])
            })
    }
    else {
        res.json([{ 'event': 'fill' }])
    }

})

router.post('/add-patient/follow-up', (req, res) => {
    const {
        patient_id,
        follow_up_date,
        psa,
        creatinine,
        wbc,
        rbc,
        hemoglobin,
        hematocrit,
        platelet_count,
        lactate_dehydrogenase,
        alkaline_phosphatase,
        sgpt_sgot_bilirubins,
        normal_salivary_gland,
        right_obstruction,
        left_obstruction,
        renal_scintigraphy,
        bone_scan,
        metastasis_location,
        lesion_ga_psma,
        lesion_prostate_a,
        lesion_prostate_a_location,
        lesion_prostate_a_suv,
        lesion_prostate_a_measurement,
        lesion_lymph_a,
        lesion_lymph_a_location,
        lesion_lymph_a_suv,
        lesion_lymph_a_measurement,
        lesion_bone_a,
        lesion_bone_a_location,
        lesion_bone_a_suv,
        lesion_bone_a_measurement,
        lesion_brain_a,
        lesion_brain_a_location,
        lesion_brain_a_suv,
        lesion_brain_a_measurement,
        lesion_lungs_a,
        lesion_lungs_a_location,
        lesion_lungs_a_suv,
        lesion_lungs_a_measurement,
        lesion_liver_a,
        lesion_liver_a_location,
        lesion_liver_a_suv,
        lesion_liver_a_measurement,
        lesion_others_a,
        lesion_others_a_location,
        lesion_others_a_suv,
        lesion_others_a_measurement,
        lesion_fdg_ctr,
        lesion_prostate_b,
        lesion_prostate_b_location,
        lesion_prostate_b_suv,
        lesion_prostate_b_measurement,
        lesion_lymph_b,
        lesion_lymph_b_location,
        lesion_lymph_b_suv,
        lesion_lymph_b_measurement,
        lesion_bone_b,
        lesion_bone_b_location,
        lesion_bone_b_suv,
        lesion_bone_b_measurement,
        lesion_brain_b,
        lesion_brain_b_location,
        lesion_brain_b_suv,
        lesion_brain_b_measurement,
        lesion_lungs_b,
        lesion_lungs_b_location,
        lesion_lungs_b_suv,
        lesion_lungs_b_measurement,
        lesion_liver_b,
        lesion_liver_b_location,
        lesion_liver_b_suv,
        lesion_liver_b_measurement,
        lesion_others_b,
        lesion_others_b_location,
        lesion_others_b_suv,
        lesion_others_b_measurement,
        assessment,
        plan } = req.body;
    const lesion_check = (lesion_prostate_a) ? (lesion_prostate_a_location != '' && lesion_prostate_a_measurement != '' &&
        lesion_prostate_a_suv != '') : true && (lesion_lymph_a) ? (lesion_lymph_a_location != '' && lesion_lymph_a_measurement != '' && lesion_lymph_a_suv != '') : true &&
        (lesion_bone_a) ? (lesion_bone_a_location != '' && lesion_bone_a_measurement != '' && lesion_bone_a_suv != '') : true &&
        (lesion_brain_a) ? (lesion_brain_a_location != '' && lesion_brain_a_measurement != '' && lesion_brain_a_suv != '') : true &&
        (lesion_lungs_a) ? (lesion_lungs_a_location != '' && lesion_lungs_a_measurement != '' && lesion_lungs_a_suv != '') : true &&
        (lesion_liver_a) ? (lesion_liver_a_location != '' && lesion_liver_a_measurement != '' && lesion_liver_a_suv != '') : true &&
        (lesion_others_a) ? (lesion_others_a_location != '' && lesion_others_a_measurement != '' && lesion_others_a_suv != '') : true &&
        (lesion_prostate_b) ? (lesion_prostate_b_location != '' && lesion_prostate_b_measurement != '' &&
        lesion_prostate_b_suv != '') : true && (lesion_lymph_b != '') ? (lesion_lymph_b_location != '' && lesion_lymph_b_measurement != '' && lesion_lymph_b_suv != '') : true &&
        (lesion_bone_b != '') ? (lesion_bone_b_location != '' && lesion_bone_b_measurement != '' && lesion_bone_b_suv != '') : true &&
        (lesion_brain_b) ? (lesion_brain_b_location != '' && lesion_brain_b_measurement != '' && lesion_brain_b_suv != '') : true &&
        (lesion_lungs_b) ? (lesion_lungs_b_location != '' && lesion_lungs_b_measurement != '' && lesion_lungs_b_suv != '') : true &&
        (lesion_liver_b) ? (lesion_liver_b_location != '' && lesion_liver_b_measurement != '' && lesion_liver_b_suv != '') : true &&
        (lesion_others_b) ? (lesion_others_b_location != '' && lesion_others_b_measurement != '' && lesion_others_b_suv != '') : true

    const empty_check = (patient_id != null || patient_id != undefined) && follow_up_date != '' && psa != '' && creatinine != '' && wbc != '' && rbc != '' && hemoglobin != '' && hematocrit != '' && platelet_count != '' &&
        lactate_dehydrogenase != '' && alkaline_phosphatase != '' && sgpt_sgot_bilirubins != '' && renal_scintigraphy != '' && metastasis_location != '' && lesion_ga_psma != '' && ((typeof lesion_fdg_ctr === 'string') ? false : true) && assessment != '' && plan != ''
       console.log(empty_check, lesion_check)
    if (lesion_check && empty_check) {
        db('part4').insert({
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
            lesion_fdg_ct: lesion_fdg_ctr,
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
            .then(() => {
                res.json([{ 'event': 'success' }])

            })
            .catch((err) => {
                res.json([{ 'event': 'error' }])
            })
    }
    else {
        res.json([{ 'event': 'fill' }])
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    db('users')
    .select('username', 'password')
    .where({
        username: username
    })
    .then(data => {
        if(data.length > 0){
            data[0].password = CryptoJS.AES.decrypt(data[0].password, process.env.KEY).toString(CryptoJS.enc.Utf8)
        if(data[0].password === password) {
            res.json([{
                username: data[0].username,
                event: 'success'
            }])
        }
        else res.json([{event: 'password incorrect'}])
        }
        else res.json([{event: 'user not found'}])
    })
})
module.exports = router
const express = require('express');
const db = require('../database/connection');
const router = express.Router();

router.get('/patient', (req, res) => {
    db('part1').select(['part1.first_name', 'part1.last_name', 'part1.patient_code'])
    .where((builder) => {
        if(req.query['part1.first_name'] && req.query['part1.last_name']){
             builder.whereILike('part1.first_name', `${req.query['part1.first_name']}%`)
             .andWhereILike('part1.last_name', `${req.query['part1.last_name']}%`);
        }
        else if(req.query['part1.last_name']) builder.whereILike('part1.last_name', `${req.query['part1.last_name']}%`);
        else if(req.query['part1.first_name']) builder.whereILike('part1.first_name', `${req.query['part1.first_name']}%`);
    })
    .orderBy('part1.created_at', 'asc')
    .returning()
    .then((data) => {
        res.json(data);
    })
})

router.get('/demographic', (req, res) => {
    db('part1').select()
    .where('part1.patient_code', req.query['patient_code'])
    .returning()
    .then((data) => res.json(data))
})

router.get('/therapy', (req, res) => {
    db('part2').select()
    .where('part2.patient_id', req.query['patient_code'])
    .orderBy('part2.created_at', 'asc')
    .returning()
    .then((data) => res.json(data))
})

router.get('/post-therapy', (req, res) => {
    db('part3').select()
    .where('part3.patient_id', req.query['patient_code'])
    .orderBy('part3.created_at', 'asc')
    .returning()
    .then((data) => res.json(data))
})

router.get('/followup', (req, res) => {
    db('part4').select()
    .where('part4.patient_id', req.query['patient_code'])
    .orderBy('part4.created_at', 'asc')
    .returning()
    .then((data) => res.json(data))
})

router.get('/max-postscan', (req, res) => {
    db('part3').count()
    .groupBy('patient_id')
    .orderBy('count', 'desc')
    .returning()
    .then((data) => res.json(data))
})

router.get('/count-assessment', (req, res) => {
    db('part1').select(['part1.patient_code', 'part1.first_name', 'part1.last_name'])
    .where('part1.assessment', req.query['assessment'])
    .returning()
    .then((data) => res.json(data))
})

router.get('/count-metastasis', (req, res) => {
    db('part1').select(['part1.patient_code', 'part1.first_name', 'part1.last_name'])
    .where('part1.bone_scan', true)
    .returning()
    .then((data) => res.json(data))
})

router.get('/count-sideeffects', (req, res) => {
    db('part1')
    .leftJoin('part2', 'part1.patient_code', 'part2.patient_id')
    .distinct(['part1.patient_code', 'part1.first_name', 'part1.last_name'])
    .where('part2.have_fatigue', true)
    .orWhere('part2.have_nausea_vomitting', true)
    .orWhere('part2.have_dry_lipmouth', true)
    .orWhere('part2.have_headache', true)
    .orWhere('part2.have_bone_pain', true)
    .orWhere('part2.other_side_effect', true)
    .orderBy('part1.patient_code', 'asc')
    .returning()
    .then((data) => res.json(data))
})

router.get('/count-lesion-part1', (req, res) => {
    db('part1').select(['part1.patient_code', 'part1.first_name', 'part1.last_name'])
    .where((builder) => {
        if (req.query['none']){
            builder.where('part1.lesion_prostate_a', '!=', true).andWhere('part1.lesion_prostate_b', '!=', true)
            .andWhere('part1.lesion_lymph_a', '!=', true).andWhere('part1.lesion_lymph_b', '!=', true)
            .andWhere('part1.lesion_bone_a', '!=', true).andWhere('part1.lesion_bone_b', '!=', true)
            .andWhere('part1.lesion_brain_a', '!=', true).andWhere('part1.lesion_brain_b', '!=', true)
            .andWhere('part1.lesion_lungs_a', '!=', true).andWhere('part1.lesion_lungs_b', '!=', true)
            .andWhere('part1.lesion_liver_a', '!=', true).andWhere('part1.lesion_liver_b', '!=', true)
            .andWhere('part1.lesion_others_a', '!=', true).andWhere('part1.lesion_others_b', '!=', true)
        }
        else {
            if (req.query['prostate']) builder.where('part1.lesion_prostate_a', true).orWhere('part1.lesion_prostate_b', true)
            if (req.query['lymph']) builder.orWhere('part1.lesion_lymph_a', true).orWhere('part1.lesion_lymph_b', true)
            if (req.query['bone']) builder.orWhere('part1.lesion_bone_a', true).orWhere('part1.lesion_bone_b', true)
            if (req.query['brain']) builder.orWhere('part1.lesion_brain_a', true).orWhere('part1.lesion_brain_b', true)
            if (req.query['lungs']) builder.orWhere('part1.lesion_lungs_a', true).orWhere('part1.lesion_lungs_b', true)
            if (req.query['liver']) builder.orWhere('part1.lesion_liver_a', true).orWhere('part1.lesion_liver_b', true)
            if (req.query['others']) builder.orWhere('part1.lesion_others_a', true).orWhere('part1.lesion_others_b', true)
        }
    })
    .orderBy('part1.patient_code', 'asc')
    .returning()
    .then((data) => res.json(data))
})

router.get('/count-lesion-part3', async (req, res) => {
    const num = parseInt(req.query.num)
    var all_patients = {};
    await db('part3').select(['part3.patient_id', 'part3.post_therapy_id'])
    .orderBy('part3.patient_id', 'asc')
    .orderBy('part3.post_therapy_id', 'asc')
    .returning()
    .then((data) => {
        all_patients = data
    })
    .then(async () => {
    await db('part1')
    .leftJoin('part3', 'part1.patient_code', 'part3.patient_id')
    .select(['part1.patient_code', 'part3.post_therapy_id' , 'part1.first_name', 'part1.last_name'])
    .where((builder) => {
        if (req.query['none']) {
        builder.where('part3.lesion_prostate', '!=', true)
            .andWhere('part3.lesion_lymph', '!=', true)
            .andWhere('part3.lesion_bones', '!=', true)
            .andWhere('part3.lesion_lungs', '!=', true)
            .andWhere('part3.lesion_liver', '!=', true)
        }
        else {
            if (req.query['prostate']) builder.where('part3.lesion_prostate', true)
            if (req.query['lymph']) builder.orWhere('part3.lesion_lymph', true)
            if (req.query['bone']) builder.orWhere('part3.lesion_bones', true)
            if (req.query['lungs']) builder.orWhere('part3.lesion_lungs', true)
            if (req.query['liver']) builder.orWhere('part3.lesion_liver', true)
        }
    })
    .orderBy('part1.patient_code', 'asc')
    .returning()
    .then((data) => {
        var pat = {}
        for (let i = 0; i < all_patients.length; i++) {
            if(!pat[`${all_patients[i].patient_id}`]){
                pat[`${all_patients[i].patient_id}`] = [all_patients[i].post_therapy_id]
            }
            else {
                pat[`${all_patients[i].patient_id}`].push(all_patients[i].post_therapy_id)
            }
        }
        var new_data = []
        for (let i = 0; i < data.length; i++){
            if (pat[`${data[i].patient_code}`].indexOf(data[i].post_therapy_id) == (num - 1)){
                new_data.push(data[i])
            }
        }
        res.json(new_data)
    })
    })
})

router.get('/count-lesion-part4', (req, res) => {
    db('part1')
    .leftJoin('part4', 'part1.patient_code', 'part4.patient_id')
    .distinct(['part1.patient_code', 'part1.first_name', 'part1.last_name'])
    .where((builder) => {
        if(req.query['none']){
            builder.where('part4.lesion_prostate_a', '!=', true).andWhere('part4.lesion_prostate_b', '!=', true)
            .andWhere('part4.lesion_lymph_a', '!=', true).andWhere('part4.lesion_lymph_b', '!=', true)
            .andWhere('part4.lesion_bone_a', '!=', true).andWhere('part4.lesion_bone_b', '!=', true)
            .andWhere('part4.lesion_brain_a', '!=', true).andWhere('part4.lesion_brain_b', '!=', true)
            .andWhere('part4.lesion_lungs_a', '!=', true).andWhere('part4.lesion_lungs_b', '!=', true)
            .andWhere('part4.lesion_liver_a', '!=', true).andWhere('part4.lesion_liver_b', '!=', true)
            .andWhere('part4.lesion_others_a', '!=', true).andWhere('part4.lesion_others_b', '!=', true)
        }
        else{
            if (req.query['prostate']) builder.where('part4.lesion_prostate_a', true).orWhere('part4.lesion_prostate_b', true)
            if (req.query['lymph']) builder.orWhere('part4.lesion_lymph_a', true).orWhere('part4.lesion_lymph_b', true)
            if (req.query['bone']) builder.orWhere('part4.lesion_bone_a', true).orWhere('part4.lesion_bone_b', true)
            if (req.query['brain']) builder.orWhere('part4.lesion_brain_a', true).orWhere('part4.lesion_brain_b', true)
            if (req.query['lungs']) builder.orWhere('part4.lesion_lungs_a', true).orWhere('part4.lesion_lungs_b', true)
            if (req.query['liver']) builder.orWhere('part4.lesion_liver_a', true).orWhere('part4.lesion_liver_b', true)
            if (req.query['others']) builder.orWhere('part4.lesion_others_a', true).orWhere('part4.lesion_others_b', true)
        }
    })
    .orderBy('part1.patient_code', 'asc')
    .returning()
    .then((data) => res.json(data))
})

module.exports = router
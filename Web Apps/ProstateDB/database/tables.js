const CryptoJS = require('crypto-js');
require('dotenv').config()
const functions = {
    generateTables: async (db) => {
        await db.schema.hasTable('part1').then(async (e) => {
            if (!e) {
                await db.schema.createTable('part1', (t) => {
                    //demographic info
                    t.increments('patient_code').primary().unique();
                    t.string('first_name');
                    t.string('last_name');
                    t.integer('age').unsigned();
                    t.string('city_of_residence');
                    t.string('date_of_diagnosis');
                    t.string('date_of_surgery');
                    t.string('histopath_result')
                    t.integer('gleason_score');
                    t.string('date_of_treatment');
                    t.string('treatment_type');
                    //physical exam
                    t.float('ecog_score');
                    t.float('ht');
                    t.float('wt');
                    t.float('bmi');
                    t.string('bp');
                    t.float('hr');
                    t.float('pain_score');
                    t.string('local_symptoms');
                    t.string('systemic_symptoms');
                    //laboratory tests
                    t.float('psa');
                    t.float('creatinine');
                    t.float('wbc');
                    t.float('rbc');
                    t.float('hemoglobin');
                    t.float('hematocrit');
                    t.float('platelet_count');
                    t.float('lactate_dehydrogenase');
                    t.float('alkaline_phosphatase');
                    t.float('sgpt_sgot_bilirubins');
                    //imaging
                    t.boolean('normal_salivary_gland');
                    t.boolean('right_obstruction');
                    t.boolean('left_obstruction');
                    t.string('renal_scintigraphy');
                    t.boolean('bone_scan');
                    t.string('metastasis_location');
                    t.string('lesion_ga_psma');
                    t.boolean('lesion_prostate_a');
                    t.string('lesion_prostate_a_location');
                    t.float('lesion_prostate_a_suv');
                    t.float('lesion_prostate_a_measurement');
                    t.boolean('lesion_lymph_a');
                    t.string('lesion_lymph_a_location');
                    t.float('lesion_lymph_a_suv');
                    t.float('lesion_lymph_a_measurement');
                    t.boolean('lesion_bone_a');
                    t.string('lesion_bone_a_location');
                    t.float('lesion_bone_a_suv');
                    t.float('lesion_bone_a_measurement');
                    t.boolean('lesion_brain_a');
                    t.string('lesion_brain_a_location');
                    t.float('lesion_brain_a_suv');
                    t.float('lesion_brain_a_measurement');
                    t.boolean('lesion_lungs_a');
                    t.string('lesion_lungs_a_location');
                    t.float('lesion_lungs_a_suv');
                    t.float('lesion_lungs_a_measurement');
                    t.boolean('lesion_liver_a');
                    t.string('lesion_liver_a_location');
                    t.float('lesion_liver_a_suv');
                    t.float('lesion_liver_a_measurement');
                    t.boolean('lesion_others_a');
                    t.string('lesion_others_a_location');
                    t.float('lesion_others_a_suv');
                    t.float('lesion_others_a_measurement');
                    t.boolean('lesion_fdg_ct');
                    t.boolean('lesion_prostate_b');
                    t.string('lesion_prostate_b_location');
                    t.float('lesion_prostate_b_suv');
                    t.float('lesion_prostate_b_measurement');
                    t.boolean('lesion_lymph_b');
                    t.string('lesion_lymph_b_location');
                    t.float('lesion_lymph_b_suv');
                    t.float('lesion_lymph_b_measurement');
                    t.boolean('lesion_bone_b');
                    t.string('lesion_bone_b_location');
                    t.float('lesion_bone_b_suv');
                    t.float('lesion_bone_b_measurement');
                    t.boolean('lesion_brain_b');
                    t.string('lesion_brain_b_location');
                    t.float('lesion_brain_b_suv');
                    t.float('lesion_brain_b_measurement');
                    t.boolean('lesion_lungs_b');
                    t.string('lesion_lungs_b_location');
                    t.float('lesion_lungs_b_suv');
                    t.float('lesion_lungs_b_measurement');
                    t.boolean('lesion_liver_b');
                    t.string('lesion_liver_b_location');
                    t.float('lesion_liver_b_suv');
                    t.float('lesion_liver_b_measurement');
                    t.boolean('lesion_others_b');
                    t.string('lesion_others_b_location');
                    t.float('lesion_others_b_suv');
                    t.float('lesion_others_b_measurement');
                    t.string('assessment');
                    t.string('plan');
                    t.timestamp('created_at').defaultTo(db.fn.now());
                })
                    .then(() => {
                        console.log('created part1')
                    })
            }
            else {
                console.log('table already exists')
            }
        })
            .then(
                async () => {
                    await db.schema.hasTable('part2')
                        .then(async (e) => {
                            if (!e) {
                                await db.schema.createTable('part2', (t) => {
                                    t.increments('therapy_id').primary();
                                    t.integer('patient_id');
                                    t.foreign('patient_id').references('part1.patient_code');
                                    t.string('date_radioligand');
                                    t.string('pre_meds');
                                    t.string('meds');
                                    t.string('p2_bp');
                                    t.float('p2_hr');
                                    t.float('p2_rr');
                                    t.float('oxygen_sat');
                                    t.string('date_therapy');
                                    t.string('radiopharm');
                                    t.string('activity');
                                    //symptoms check
                                    t.boolean('have_fatigue');
                                    t.boolean('have_nausea_vomitting');
                                    t.boolean('have_dry_lipmouth');
                                    t.boolean('have_headache');
                                    t.boolean('have_bone_pain');
                                    t.boolean('other_side_effect');
                                    t.timestamp('created_at').defaultTo(db.fn.now());
                                })
                                    .then(console.log('created part2'))
                            }
                            else {
                                console.log('table already exists')
                            }
                        })
                }
            )
            .then(
                async () => {
                    await db.schema.hasTable('part3')
                        .then(async (e) => {
                            if (!e) {
                                await db.schema.createTable('part3', (t) => {
                                    t.increments('post_therapy_id').primary();
                                    t.integer('patient_id');
                                    t.integer('therapy_id');
                                    t.foreign('patient_id').references('part1.patient_code');
                                    t.foreign('therapy_id').references('part2.therapy_id');
                                    t.string('date_post_therapy');
                                    t.integer('pts_hour');
                                    t.boolean('with_spect');
                                    t.boolean('lesion_prostate');
                                    t.boolean('lesion_lymph');
                                    t.boolean('lesion_bones');
                                    t.boolean('lesion_lungs');
                                    t.boolean('lesion_liver');
                                    t.float('dosimetry_saliva');
                                    t.float('dosimetry_kidney_left');
                                    t.float('dosimetry_kidney_right');
                                    t.timestamp('created_at').defaultTo(db.fn.now());
                                })
                                    .then(console.log('created part3'))
                            }
                            else {
                                console.log('table already exists');
                            }
                        })
                }
            )
            .then(
                async () => {
                    await db.schema.hasTable('part4')
                        .then(async (e) => {
                            if (!e) {
                                await db.schema.createTable('part4', (t) => {
                                    t.increments('follow_up_id');
                                    t.integer('patient_id');
                                    t.foreign('patient_id').references('part1.patient_code');
                                    t.string('follow_up_date');
                                    t.float('psa');
                                    t.float('creatinine');
                                    t.float('wbc');
                                    t.float('rbc');
                                    t.float('hemoglobin');
                                    t.float('hematocrit');
                                    t.float('platelet_count');
                                    t.float('lactate_dehydrogenase');
                                    t.float('alkaline_phosphatase');
                                    t.float('sgpt_sgot_bilirubins');
                                    //imaging
                                    t.boolean('normal_salivary_gland');
                                    t.boolean('right_obstruction');
                                    t.boolean('left_obstruction');
                                    t.string('renal_scintigraphy');
                                    t.boolean('bone_scan');
                                    t.string('metastasis_location');
                                    t.string('lesion_ga_psma');
                                    t.boolean('lesion_prostate_a');
                                    t.string('lesion_prostate_a_location');
                                    t.float('lesion_prostate_a_suv');
                                    t.float('lesion_prostate_a_measurement');
                                    t.boolean('lesion_lymph_a');
                                    t.string('lesion_lymph_a_location');
                                    t.float('lesion_lymph_a_suv');
                                    t.float('lesion_lymph_a_measurement');
                                    t.boolean('lesion_bone_a');
                                    t.string('lesion_bone_a_location');
                                    t.float('lesion_bone_a_suv');
                                    t.float('lesion_bone_a_measurement');
                                    t.boolean('lesion_brain_a');
                                    t.string('lesion_brain_a_location');
                                    t.float('lesion_brain_a_suv');
                                    t.float('lesion_brain_a_measurement');
                                    t.boolean('lesion_lungs_a');
                                    t.string('lesion_lungs_a_location');
                                    t.float('lesion_lungs_a_suv');
                                    t.float('lesion_lungs_a_measurement');
                                    t.boolean('lesion_liver_a');
                                    t.string('lesion_liver_a_location');
                                    t.float('lesion_liver_a_suv');
                                    t.float('lesion_liver_a_measurement');
                                    t.boolean('lesion_others_a');
                                    t.string('lesion_others_a_location');
                                    t.float('lesion_others_a_suv');
                                    t.float('lesion_others_a_measurement');
                                    t.boolean('lesion_fdg_ct');
                                    t.boolean('lesion_prostate_b');
                                    t.string('lesion_prostate_b_location');
                                    t.float('lesion_prostate_b_suv');
                                    t.float('lesion_prostate_b_measurement');
                                    t.boolean('lesion_lymph_b');
                                    t.string('lesion_lymph_b_location');
                                    t.float('lesion_lymph_b_suv');
                                    t.float('lesion_lymph_b_measurement');
                                    t.boolean('lesion_bone_b');
                                    t.string('lesion_bone_b_location');
                                    t.float('lesion_bone_b_suv');
                                    t.float('lesion_bone_b_measurement');
                                    t.boolean('lesion_brain_b');
                                    t.string('lesion_brain_b_location');
                                    t.float('lesion_brain_b_suv');
                                    t.float('lesion_brain_b_measurement');
                                    t.boolean('lesion_lungs_b');
                                    t.string('lesion_lungs_b_location');
                                    t.float('lesion_lungs_b_suv');
                                    t.float('lesion_lungs_b_measurement');
                                    t.boolean('lesion_liver_b');
                                    t.string('lesion_liver_b_location');
                                    t.float('lesion_liver_b_suv');
                                    t.float('lesion_liver_b_measurement');
                                    t.boolean('lesion_others_b');
                                    t.string('lesion_others_b_location');
                                    t.float('lesion_others_b_suv');
                                    t.float('lesion_others_b_measurement');
                                    t.string('assessment');
                                    t.string('plan');
                                    t.timestamp('created_at').defaultTo(db.fn.now());
                                })
                                .then(console.log('created part4'))
                            }
                            else {
                                console.log('table already exists');
                            }
                        })
                }
            )
            .then(
                async () => {
                    await db.schema.hasTable('users')
                    .then(async (e) => {
                        if (!e){
                            await db.schema.createTable('users', (t) => {
                                t.increments('user_id');
                                t.string('username');
                                t.string('password');
                            })
                            .then(async () => await db('users').insert([{
                                username: 'admin',
                                password: CryptoJS.AES.encrypt('password', process.env.KEY).toString()
                            }]))
                        }
                        else {
                            console.log('table already exists')
                        }
                    }
                    )
                }
            )
    }
}

module.exports = functions
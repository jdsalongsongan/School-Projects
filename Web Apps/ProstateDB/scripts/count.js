const count_select = document.querySelector('#count-category');
const added_fields = document.querySelector('.extras');
const submit_btn = document.querySelector('#submit-count');

count_select.addEventListener('change', () => {
    if(count_select.value === 'none') added_fields.innerHTML = ''
    else if (count_select.value === 'assessment') {
        added_fields.innerHTML = `
        <div class="form-floating mb-3">
            <select class="form-select selections" aria-label="select risk" id="selection" style="width: 50%;">
                <option selected value="none"></option>
                <option value="low">Low Risk</option>
                <option value="intermediate">Intermediate Risk</option>
                <option value="high">High Risk</option>
            </select>
            <label for="selection">equal to</label>
        </div>`
    }
    else if (count_select.value === 'metastasis') added_fields.innerHTML = ''
    else if (count_select.value === 'side') added_fields.innerHTML = ''
    else if (count_select.value === 'lesions') {
        added_fields.innerHTML = `
        <div class="card mb-3" style="width: 50%">
        <div class="card-header">on</div>
            <div class="card-body">
                <div class="form-check form-check-inline">
                    <input class="form-check-input checks" type="checkbox" id="checkbox-prostate" value="prostate">
                    <label class="form-check-label" for="checkbox-prostate">Prostate</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input checks" type="checkbox" id="checkbox-lymph" value="lymph">
                    <label class="form-check-label" for="checkbox-lymph">Lymph Nodes</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input checks" type="checkbox" id="checkbox-bone" value="bone">
                    <label class="form-check-label" for="checkbox-bone">Bone</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input checks" type="checkbox" id="checkbox-brain" value="brain">
                    <label class="form-check-label" for="checkbox-brain">Brain</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input checks" type="checkbox" id="checkbox-lungs" value="lungs">
                    <label class="form-check-label" for="checkbox-lungs">Lungs</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input checks" type="checkbox" id="checkbox-liver" value="liver">
                    <label class="form-check-label" for="checkbox-liver">Liver</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input checks" type="checkbox" id="checkbox-others" value="others">
                    <label class="form-check-label" for="checkbox-others">Others</label>
                </div>
            </div>
        </div>
        <div class="form-floating mb-3">
            <select class="form-select subsel selections" aria-label="select based" id="selection" style="width: 50%;">
                <option selected value="none"></option>
                <option value="imaging">Ga-68/F18-PSMA imaging/FDG PET/CT</option>
                <option value="postscan">Post-theraphy scan</option>
            </select>
            <label for="selection">based on</label>
        </div>
        <div class="subextra"></div>`
        const subselect = document.querySelector('.subsel')
        
        subselect.addEventListener('change', () => {
        const subextra = document.querySelector('.subextra')
        if (subselect.value === 'none') subextra.innerHTML = ''
        else if (subselect.value === 'imaging') {
            subextra.innerHTML = `
            <div class="form-floating mb-3">
            <select class="form-select selections" aria-label="select during" id="selection" style="width: 50%;">
                <option selected value="none"></option>
                <option value="screening">Screening</option>
                <option value="followup">Follow up</option>
            </select>
            <label for="selection">during</label>
        </div>`
        }
        else if (subselect.value === 'postscan'){
            //make this dynamic
            //make a get request that counts the number of post theraphy per patient
            //temporarily make it 3
            subextra.innerHTML = `
            <div class="form-floating mb-3">
            <select class="form-select selections max_num_of_post" aria-label="select number" id="selection" style="width: 50%;">
                <option selected value="none"></option>
            </select>
            <label for="selection">number</label>
        </div>`
        const max_num_of_post = document.querySelector('.max_num_of_post')
        fetch('/request/max-postscan', {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then((data) => {
            const maxnum = data[0].count;
            for(let i = 1; i <= maxnum; i++){
                const opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = i;
                max_num_of_post.appendChild(opt);
            }
        })
        }
        })
    }
})

submit_btn.addEventListener('click', () => {
    const selection = document.querySelectorAll('.selections');
    if (count_select.value === 'none') alert('Please select a count category')
    else if (count_select.value === 'assessment') {
        fetch(`/request/count-assessment?assessment=${selection[1].value}`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => {
            const results = document.querySelector('.results');
            results.style.display = 'block';
            results.innerHTML =
            `<div class="card-header">Number of Patients: <span class="number-of-patients">${data.length}</span></div>
            <div class="card-body list-of-patients" style="display:none;"></div>`
            const number_of_patients = document.querySelector('.number-of-patients')
            number_of_patients.addEventListener('click', () => {
                const list_of_patients = document.querySelector('.list-of-patients');
                list_of_patients.style.display = 'block';
                if (data.length == 0){
                    list_of_patients.innerHTML = ''
                    const nothing_found = document.createElement('p');
                    nothing_found.className = 'card-text text-center';
                    nothing_found.innerHTML = 'Nothing found.';
                    list_of_patients.appendChild(nothing_found);
                }
                else {
                    list_of_patients.innerHTML = ''
                    const res_table = document.createElement('table');
                    res_table.className = 'table text-center';
                    const tbl_header = document.createElement('thead');
                    const tbl_header_row = document.createElement('tr');
                    const col_1 = document.createElement('th')
                    const col_2 = document.createElement('th')
                 
                    col_1.scope = 'col'
                    col_2.scope = 'col'
                
                  
                    col_1.innerHTML = 'Patient Code'
                    col_2.innerHTML = 'Patient Name'
                  
                    const tbl_body = document.createElement('tbody')
                    for(let i = 0; i < data.length; i++){
                        const tbl_row = document.createElement('tr')
                        tbl_row.innerHTML = `<th scope='col'>${data[i].patient_code}</th>`
                        const btn = document.createElement('td')
                        btn.innerHTML = `${data[i].first_name} ${data[i].last_name}` 

                        btn.addEventListener('click', () => {
                            sessionStorage.setItem('patient_code', data[i].patient_code)
                            sessionStorage.setItem('first_name', data[i].first_name)
                            sessionStorage.setItem('last_name', data[i].last_name)
                            location.href = '/view-patient'
                        })
                       
                        tbl_row.appendChild(btn)
                        tbl_body.appendChild(tbl_row)
                    }
    
    
                    tbl_header_row.appendChild(col_1)
                    tbl_header_row.appendChild(col_2)

                    tbl_header.appendChild(tbl_header_row)
                    res_table.appendChild(tbl_header)
                    res_table.appendChild(tbl_body)
                    list_of_patients.appendChild(res_table)
                }
            })
        })
    }
    else if (count_select.value === 'metastasis') {
        fetch(`/request/count-metastasis`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => {
            const results = document.querySelector('.results');
            results.style.display = 'block';
            results.innerHTML =
            `<div class="card-header">Number of Patients: <span class="number-of-patients">${data.length}</span></div>
            <div class="card-body list-of-patients" style="display:none;"></div>`
            const number_of_patients = document.querySelector('.number-of-patients')
            number_of_patients.addEventListener('click', () => {
                const list_of_patients = document.querySelector('.list-of-patients');
                list_of_patients.style.display = 'block';
                if (data.length == 0){
                    list_of_patients.innerHTML = ''
                    const nothing_found = document.createElement('p');
                    nothing_found.className = 'card-text text-center';
                    nothing_found.innerHTML = 'Nothing found.';
                    list_of_patients.appendChild(nothing_found);
                }
                else {
                    list_of_patients.innerHTML = ''
                    const res_table = document.createElement('table');
                    res_table.className = 'table text-center';
                    const tbl_header = document.createElement('thead');
                    const tbl_header_row = document.createElement('tr');
                    const col_1 = document.createElement('th')
                    const col_2 = document.createElement('th')
                 
                    col_1.scope = 'col'
                    col_2.scope = 'col'
                
                  
                    col_1.innerHTML = 'Patient Code'
                    col_2.innerHTML = 'Patient Name'
                  
                    const tbl_body = document.createElement('tbody')
                    for(let i = 0; i < data.length; i++){
                        const tbl_row = document.createElement('tr')
                        tbl_row.innerHTML = `<th scope='col'>${data[i].patient_code}</th>`
                        const btn = document.createElement('td')
                        btn.innerHTML = `${data[i].first_name} ${data[i].last_name}` 

                        btn.addEventListener('click', () => {
                            sessionStorage.setItem('patient_code', data[i].patient_code)
                            sessionStorage.setItem('first_name', data[i].first_name)
                            sessionStorage.setItem('last_name', data[i].last_name)
                            location.href = '/view-patient'
                        })
                       
                        tbl_row.appendChild(btn)
                        tbl_body.appendChild(tbl_row)
                    }
    
    
                    tbl_header_row.appendChild(col_1)
                    tbl_header_row.appendChild(col_2)

                    tbl_header.appendChild(tbl_header_row)
                    res_table.appendChild(tbl_header)
                    res_table.appendChild(tbl_body)
                    list_of_patients.appendChild(res_table)
                }
            })
        })
    }
    else if (count_select.value === 'lesions') {
        const checks = document.querySelectorAll('.checks')
        var queryBody = []
        if (checks[0].checked) queryBody.push('prostate=true')
        if (checks[1].checked) queryBody.push('lymph=true')
        if (checks[2].checked) queryBody.push('bone=true')
        if (checks[3].checked) queryBody.push('brain=true')
        if (checks[4].checked) queryBody.push('lungs=true')
        if (checks[5].checked) queryBody.push('liver=true')
        if (checks[6].checked) queryBody.push('others=true')
        if (!checks[0].checked && !checks[1].checked && !checks[2].checked && !checks[3].checked &&
            !checks[4].checked && !checks[5].checked && !checks[6].checked) queryBody.push('none=true')
        var queryString = queryBody.join('&')
        if (selection[1].value == 'imaging') {
            if (selection[2].value == 'screening') {
                fetch(`/request/count-lesion-part1?${queryString}`, {
                    method: 'GET',
                    headers: new Headers({'Content-Type': 'application/json'})
                })
                .then(res => res.json())
                .then(data => {
                    const results = document.querySelector('.results');
                    results.style.display = 'block';
                    results.innerHTML =
                    `<div class="card-header">Number of Patients: <span class="number-of-patients">${data.length}</span></div>
                    <div class="card-body list-of-patients" style="display:none;"></div>`
                    const number_of_patients = document.querySelector('.number-of-patients')
                    number_of_patients.addEventListener('click', () => {
                        const list_of_patients = document.querySelector('.list-of-patients');
                        list_of_patients.style.display = 'block';
                        if (data.length == 0){
                            list_of_patients.innerHTML = ''
                            const nothing_found = document.createElement('p');
                            nothing_found.className = 'card-text text-center';
                            nothing_found.innerHTML = 'Nothing found.';
                            list_of_patients.appendChild(nothing_found);
                        }
                        else {
                            list_of_patients.innerHTML = ''
                            const res_table = document.createElement('table');
                            res_table.className = 'table text-center';
                            const tbl_header = document.createElement('thead');
                            const tbl_header_row = document.createElement('tr');
                            const col_1 = document.createElement('th')
                            const col_2 = document.createElement('th')
                         
                            col_1.scope = 'col'
                            col_2.scope = 'col'
                        
                          
                            col_1.innerHTML = 'Patient Code'
                            col_2.innerHTML = 'Patient Name'
                          
                            const tbl_body = document.createElement('tbody')
                            for(let i = 0; i < data.length; i++){
                                const tbl_row = document.createElement('tr')
                                tbl_row.innerHTML = `<th scope='col'>${data[i].patient_code}</th>`
                                const btn = document.createElement('td')
                                btn.innerHTML = `${data[i].first_name} ${data[i].last_name}` 
        
                                btn.addEventListener('click', () => {
                                    sessionStorage.setItem('patient_code', data[i].patient_code)
                                    sessionStorage.setItem('first_name', data[i].first_name)
                                    sessionStorage.setItem('last_name', data[i].last_name)
                                    location.href = '/view-patient'
                                })
                               
                                tbl_row.appendChild(btn)
                                tbl_body.appendChild(tbl_row)
                            }
            
            
                            tbl_header_row.appendChild(col_1)
                            tbl_header_row.appendChild(col_2)
        
                            tbl_header.appendChild(tbl_header_row)
                            res_table.appendChild(tbl_header)
                            res_table.appendChild(tbl_body)
                            list_of_patients.appendChild(res_table)
                        }
                    })
                })
            }
            else if (selection[2].value == 'followup') {
                fetch(`/request/count-lesion-part4?${queryString}`, {
                    method: 'GET',
                    headers: new Headers({'Content-Type': 'application/json'})
                })
                .then(res => res.json())
                .then(data => {
                    const results = document.querySelector('.results');
                    results.style.display = 'block';
                    results.innerHTML =
                    `<div class="card-header">Number of Patients: <span class="number-of-patients">${data.length}</span></div>
                    <div class="card-body list-of-patients" style="display:none;"></div>`
                    const number_of_patients = document.querySelector('.number-of-patients')
                    number_of_patients.addEventListener('click', () => {
                        const list_of_patients = document.querySelector('.list-of-patients');
                        list_of_patients.style.display = 'block';
                        if (data.length == 0){
                            list_of_patients.innerHTML = ''
                            const nothing_found = document.createElement('p');
                            nothing_found.className = 'card-text text-center';
                            nothing_found.innerHTML = 'Nothing found.';
                            list_of_patients.appendChild(nothing_found);
                        }
                        else {
                            list_of_patients.innerHTML = ''
                            const res_table = document.createElement('table');
                            res_table.className = 'table text-center';
                            const tbl_header = document.createElement('thead');
                            const tbl_header_row = document.createElement('tr');
                            const col_1 = document.createElement('th')
                            const col_2 = document.createElement('th')
                         
                            col_1.scope = 'col'
                            col_2.scope = 'col'
                        
                          
                            col_1.innerHTML = 'Patient Code'
                            col_2.innerHTML = 'Patient Name'
                          
                            const tbl_body = document.createElement('tbody')
                            for(let i = 0; i < data.length; i++){
                                const tbl_row = document.createElement('tr')
                                tbl_row.innerHTML = `<th scope='col'>${data[i].patient_code}</th>`
                                const btn = document.createElement('td')
                                btn.innerHTML = `${data[i].first_name} ${data[i].last_name}` 
        
                                btn.addEventListener('click', () => {
                                    sessionStorage.setItem('patient_code', data[i].patient_code)
                                    sessionStorage.setItem('first_name', data[i].first_name)
                                    sessionStorage.setItem('last_name', data[i].last_name)
                                    location.href = '/view-patient'
                                })
                               
                                tbl_row.appendChild(btn)
                                tbl_body.appendChild(tbl_row)
                            }
            
            
                            tbl_header_row.appendChild(col_1)
                            tbl_header_row.appendChild(col_2)
        
                            tbl_header.appendChild(tbl_header_row)
                            res_table.appendChild(tbl_header)
                            res_table.appendChild(tbl_body)
                            list_of_patients.appendChild(res_table)
                        }
                    })
                })
            }
        }
        else if (selection[1].value == 'postscan'){
            queryString += `&num=${selection[2].value}`
            fetch(`/request/count-lesion-part3?${queryString}`, {
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then(res => res.json())
            .then(data => {
                const results = document.querySelector('.results');
                results.style.display = 'block';
                results.innerHTML =
                `<div class="card-header">Number of Patients: <span class="number-of-patients">${data.length}</span></div>
                <div class="card-body list-of-patients" style="display:none;"></div>`
                const number_of_patients = document.querySelector('.number-of-patients')
                number_of_patients.addEventListener('click', () => {
                    const list_of_patients = document.querySelector('.list-of-patients');
                    list_of_patients.style.display = 'block';
                    if (data.length == 0){
                        list_of_patients.innerHTML = ''
                        const nothing_found = document.createElement('p');
                        nothing_found.className = 'card-text text-center';
                        nothing_found.innerHTML = 'Nothing found.';
                        list_of_patients.appendChild(nothing_found);
                    }
                    else {
                        list_of_patients.innerHTML = ''
                        const res_table = document.createElement('table');
                        res_table.className = 'table text-center';
                        const tbl_header = document.createElement('thead');
                        const tbl_header_row = document.createElement('tr');
                        const col_1 = document.createElement('th')
                        const col_2 = document.createElement('th')
                     
                        col_1.scope = 'col'
                        col_2.scope = 'col'
                    
                      
                        col_1.innerHTML = 'Patient Code'
                        col_2.innerHTML = 'Patient Name'
                      
                        const tbl_body = document.createElement('tbody')
                        for(let i = 0; i < data.length; i++){
                            const tbl_row = document.createElement('tr')
                            tbl_row.innerHTML = `<th scope='col'>${data[i].patient_code}</th>`
                            const btn = document.createElement('td')
                            btn.innerHTML = `${data[i].first_name} ${data[i].last_name}` 
    
                            btn.addEventListener('click', () => {
                                sessionStorage.setItem('patient_code', data[i].patient_code)
                                sessionStorage.setItem('first_name', data[i].first_name)
                                sessionStorage.setItem('last_name', data[i].last_name)
                                location.href = '/view-patient'
                            })
                           
                            tbl_row.appendChild(btn)
                            tbl_body.appendChild(tbl_row)
                        }
        
        
                        tbl_header_row.appendChild(col_1)
                        tbl_header_row.appendChild(col_2)
    
                        tbl_header.appendChild(tbl_header_row)
                        res_table.appendChild(tbl_header)
                        res_table.appendChild(tbl_body)
                        list_of_patients.appendChild(res_table)
                    }
                })
            })
        }
        
    }
    else if (count_select.value === 'side') {
        fetch(`/request/count-sideeffects`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => {
            const results = document.querySelector('.results');
            results.style.display = 'block';
            results.innerHTML =
            `<div class="card-header">Number of Patients: <span class="number-of-patients">${data.length}</span></div>
            <div class="card-body list-of-patients" style="display:none;"></div>`
            const number_of_patients = document.querySelector('.number-of-patients')
            number_of_patients.addEventListener('click', () => {
                const list_of_patients = document.querySelector('.list-of-patients');
                list_of_patients.style.display = 'block';
                if (data.length == 0){
                    list_of_patients.innerHTML = ''
                    const nothing_found = document.createElement('p');
                    nothing_found.className = 'card-text text-center';
                    nothing_found.innerHTML = 'Nothing found.';
                    list_of_patients.appendChild(nothing_found);
                }
                else {
                    list_of_patients.innerHTML = ''
                    const res_table = document.createElement('table');
                    res_table.className = 'table text-center';
                    const tbl_header = document.createElement('thead');
                    const tbl_header_row = document.createElement('tr');
                    const col_1 = document.createElement('th')
                    const col_2 = document.createElement('th')
                 
                    col_1.scope = 'col'
                    col_2.scope = 'col'
                
                  
                    col_1.innerHTML = 'Patient Code'
                    col_2.innerHTML = 'Patient Name'
                  
                    const tbl_body = document.createElement('tbody')
                    for(let i = 0; i < data.length; i++){
                        const tbl_row = document.createElement('tr')
                        tbl_row.innerHTML = `<th scope='col'>${data[i].patient_code}</th>`
                        const btn = document.createElement('td')
                        btn.innerHTML = `${data[i].first_name} ${data[i].last_name}` 

                        btn.addEventListener('click', () => {
                            sessionStorage.setItem('patient_code', data[i].patient_code)
                            sessionStorage.setItem('first_name', data[i].first_name)
                            sessionStorage.setItem('last_name', data[i].last_name)
                            location.href = '/view-patient'
                        })
                       
                        tbl_row.appendChild(btn)
                        tbl_body.appendChild(tbl_row)
                    }
    
    
                    tbl_header_row.appendChild(col_1)
                    tbl_header_row.appendChild(col_2)

                    tbl_header.appendChild(tbl_header_row)
                    res_table.appendChild(tbl_header)
                    res_table.appendChild(tbl_body)
                    list_of_patients.appendChild(res_table)
                }
            })
        })
    }
})
const search_button = document.querySelector('#search-button')

search_button.addEventListener('click', () => {
    const first_name = document.querySelector('.firstname').value
    const last_name = document.querySelector('.lastname').value
    var search_string = ''
    if (first_name != '') search_string += `part1.first_name=${first_name}`
    if (last_name != '' && first_name === '') search_string += `part1.last_name=${last_name}`
    else if (last_name != '' && first_name != '') search_string += `&part1.last_name=${last_name}`
    if (search_string != ''){
        fetch(`/request/patient?${search_string}`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        .then(data => {
            const search_res = document.querySelector('.search-res');
            const display_res = document.querySelector('.display-res');
            search_res.style.display = 'block';
            if (data.length == 0) {
                display_res.innerHTML = ''
                const nothing_found = document.createElement('p');
                nothing_found.className = 'card-text text-center';
                nothing_found.innerHTML = 'Nothing found.';
                display_res.appendChild(nothing_found);
            }
            else {
                display_res.innerHTML = ''
                const res_table = document.createElement('table');
                res_table.className = 'table text-center';
                const tbl_header = document.createElement('thead');
                const tbl_header_row = document.createElement('tr');
                const col_1 = document.createElement('th')
                const col_2 = document.createElement('th')
                const col_3 = document.createElement('th')
                const col_4 = document.createElement('th')
                col_1.scope = 'col'
                col_2.scope = 'col'
                col_3.scope = 'col'
                col_4.scope = 'col'
                col_1.innerHTML = 'Patient Code'
                col_2.innerHTML = 'First Name'
                col_3.innerHTML = 'Last Name'
                col_4.innerHTML = 'Action'
                const tbl_body = document.createElement('tbody')
                for(let i = 0; i < data.length; i++){
                    const tbl_row = document.createElement('tr')
                    tbl_row.innerHTML = `
                    <th scope='col'>${data[i].patient_code}</th>
                    <td>${data[i].first_name}</td>
                    <td>${data[i].last_name}</td>
                    `
                    const btn_container = document.createElement('td')
                    const btn = document.createElement('a')
                    btn.innerHTML = 'View Patient Information'
                    btn.className = 'btn btn-outline-secondary mb-3'
                    btn.addEventListener('click', () => {
                        sessionStorage.setItem('patient_code', data[i].patient_code)
                        sessionStorage.setItem('first_name', data[i].first_name)
                        sessionStorage.setItem('last_name', data[i].last_name)
                        location.href = '/view-patient'
                    
                    })
                    btn_container.appendChild(btn)
                    tbl_row.appendChild(btn_container)
                    tbl_body.appendChild(tbl_row)
                }


                tbl_header_row.appendChild(col_1)
                tbl_header_row.appendChild(col_2)
                tbl_header_row.appendChild(col_3)
                tbl_header_row.appendChild(col_4)
                tbl_header.appendChild(tbl_header_row)
                res_table.appendChild(tbl_header)
                res_table.appendChild(tbl_body)
                display_res.appendChild(res_table)
            }
        })
    }
})


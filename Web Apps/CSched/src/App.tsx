import React, { useState } from 'react'
import './App.css'
import Checkbox from './components/Checkbox'
import Papa from 'papaparse';


function App() {
  //FCFS, SJF, SRTF, Priority Preemptive, Priority Non-Preemptive, Round-Robin.
  //make it possible to enter csv input values
  const [isFCFS, setCheckedFCFS] = useState(false);
  const handleFCFS = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedFCFS(e.target.checked);
  }

  const [isSJF, setCheckedSJF] = useState(false);
  const handleSJF = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSJF(e.target.checked);
  }

  const [isPriorityPreemptive, setCheckedPriorityPreemptive] = useState(false);
  const handlePriorityPreemptive = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedPriorityPreemptive(e.target.checked);
  }

  const checkIfRR = () => {
    let tquan = document.querySelector('.tquan') as HTMLElement;
    if (!isRoundRobin) {
      tquan.style.visibility = 'visible';
    }
    else {
      tquan.style.visibility = 'hidden';
    }
  }

  const [isRoundRobin, setCheckedRoundRobin] = useState(false);
  const handleRoundRobin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRoundRobin(e.target.checked);
    checkIfRR();
  }

  const [isPriorityNonPreemptive, setCheckedPriorityNonPreemptive] = useState(false);
  const handlePriorityNonPreemptive = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedPriorityNonPreemptive(e.target.checked);
  }

  const [isSRTF, setCheckedSRTF] = useState(false);
  const handleSRTF = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSRTF(e.target.checked);
  }

  const [parsedData, setParsedData] = useState<any[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const input = e.target.files[0]
      //check file type

      if (input.type == 'text/csv') {
        const reader = new FileReader();

        reader.onload = async ({ target }) => {
          const csv = Papa.parse(target.result, { header: false })
          const val = csv.data

          setParsedData(val)
        }
        reader.readAsText(input)
      }
      else {
        alert('File type not valid')
        setParsedData([])
      }
    }

  }

  var willProcess = true as boolean;
  const startProcess = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(parsedData)
    willProcess = true;

    if (!isFCFS && !isSRTF && !isSJF && !isPriorityNonPreemptive &&
      !isPriorityPreemptive && !isRoundRobin) willProcess = false;
    console.log(willProcess);
    let tq = 0 as number;
    if (isRoundRobin) {
      tq = document.querySelector('#timequantum').value;
      if (tq == "") willProcess = false;
    }

    if (willProcess) {
      //fetch by class name

      //this will depend on which is used
      let arrivals = document.querySelectorAll('.i0')
      let bursts = document.querySelectorAll('.i1')
      let priorities = document.querySelectorAll('.i2')

      let processNArr = [] as Array<number>
      let arrivalsArr = [] as Array<number>
      let burstsArr = [] as Array<number>
      let prioritiesArr = [] as Array<number>
      //console.log("running " + parsedData.length)
      if (parsedData.length != 0) {
        //format: line by line, 
        // 1 -> process number or process names
        // 2 -> arrival
        // 3 -> burst
        // 4 -> priority
        // if only 3 length, priority is equal
        // if only 1 input in line 1 -> number will be equal to process length

        let processc = 0 as number;

        if (parsedData[0].length == 1) {
          processc = parseInt(parsedData[0][0]);
          console.log(processc)
          for (var i = 0; i < processc; i++) {
            processNArr.push(i + 1);
          }
        }
        else {
          processc = parsedData[0].length
          for (var i = 0; i < processc; i++) {
            processNArr.push(parseInt(parsedData[0][i]));
          }
        }
        for (var i = 0; i < processc; i++) {
          arrivalsArr.push(parseInt(parsedData[1][i]));
        }

        for (var i = 0; i < processc; i++) {
          burstsArr.push(parseInt(parsedData[2][i]));
        }
        if (parsedData.length == 4) {
          for (var i = 0; i < processc; i++) {
            prioritiesArr.push(parseInt(parsedData[3][i]));
          }
        }
        else {
          for (var i = 0; i < processc; i++) {
            prioritiesArr.push(1);
          }
        }

      }
      else {

        try {
          if (!arrivals.length) throw new Error("");
          for (var ar of arrivals) {
            if (ar.value != "") arrivalsArr.push(parseInt(ar.value))
            else throw new Error("");
          }
          if (!priorities.length) throw new Error("");
          for (var ar of priorities) {
            if (ar.value != "") prioritiesArr.push(parseInt(ar.value))
            else throw new Error("");

          }
          if (!bursts.length) throw new Error("");
          for (var ar of bursts) {
            if (ar.value != "") burstsArr.push(parseInt(ar.value))
            else throw new Error("");
          }
        } catch (error) {
          willProcess = false
        }
      }

      if (willProcess) {
        //compile each process object
        var processArr = [] as Array<JSON>;

        for (var i = 0; i < arrivalsArr.length; i++) {
          var processJSON = JSON.parse(`{"process":${(parsedData.length != 0) ? processNArr[i] : i + 1}, "arrival":${arrivalsArr[i]}, "burst":${burstsArr[i]}, "priority":${prioritiesArr[i]}, 
        "completion": 0, "response": 0, "waiting": 0, "turnaround": 0}`)

          processArr.push(processJSON)
        }
        console.log(processArr)
        resultHolder = algorithmProcess(processArr, tq);
        //display results
        console.log(resultHolder)
        //arrange buttons and display


        var buttonset = document.querySelector('.buttonset') as HTMLDivElement;
        buttonset.innerHTML = ''
        if (isFCFS) {
          var btn = document.createElement('button') as HTMLButtonElement
          btn.className = 'reveal-res'
          btn.innerHTML = 'FCFS'
          buttonset.appendChild(btn)

        }
        if (isSJF) {
          var btn = document.createElement('button') as HTMLButtonElement
          btn.className = 'reveal-res'
          btn.innerHTML = 'SJF'
          buttonset.appendChild(btn)

        }
        if (isSRTF) {
          var btn = document.createElement('button') as HTMLButtonElement
          btn.className = 'reveal-res'
          btn.innerHTML = 'SRTF'
          buttonset.appendChild(btn)

        }
        if (isPriorityNonPreemptive) {
          var btn = document.createElement('button') as HTMLButtonElement
          btn.className = 'reveal-res'
          btn.innerHTML = 'Priority (Non-Preemptive)'
          buttonset.appendChild(btn)

        }
        if (isPriorityPreemptive) {
          var btn = document.createElement('button') as HTMLButtonElement
          btn.className = 'reveal-res'
          btn.innerHTML = 'Priority (Preemptive)'
          buttonset.appendChild(btn)

        }
        if (isRoundRobin) {
          var btn = document.createElement('button') as HTMLButtonElement
          btn.className = 'reveal-res'
          btn.innerHTML = 'Round Robin'
          buttonset.appendChild(btn)
        }

        var revealRes = document.querySelectorAll('.reveal-res');
        var tableRes = document.querySelector('.results') as HTMLDivElement
        var ave = document.querySelector('.averages') as HTMLDivElement
        var gnt = document.querySelector('.gannt') as HTMLDivElement
        tableRes.innerHTML = '';
        ave.innerHTML = '';
        gnt.innerHTML = '';
        for (var i = 0; i < revealRes.length; i++) {

          revealRes[i].addEventListener('click', function (i: number) {
            //0 -> table, 1 -> gannt, 2 -> bounds
            tableRes.innerHTML = '<h4>Result Table:</h4>';
            //table
            var tbl = document.createElement('table')
            var header = document.createElement('tr')
            header.innerHTML = '<th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Priority Number</th>' +
              '<th>Completion Time</th><th>Response Time</th><th>Waiting Time</th><th>Turnaround Time</th>'
            tableRes.appendChild(header)
            var aveWait = 0 as number;
            var aveRes = 0 as number;
            var aveTurn = 0 as number;
            for (var j = 0; j < resultHolder[i][0].length; j++) {
              var row = document.createElement('tr')
              row.innerHTML =
                `<td>P${resultHolder[i][0][j].process}</td>` +
                `<td>${resultHolder[i][0][j].arrival}</td>` +
                `<td>${resultHolder[i][0][j].burst}</td>` +
                `<td>${resultHolder[i][0][j].priority}</td>` +
                `<td>${resultHolder[i][0][j].completion}</td>` +
                `<td>${resultHolder[i][0][j].response}</td>` +
                `<td>${resultHolder[i][0][j].waiting}</td>` +
                `<td>${resultHolder[i][0][j].turnaround}</td>`;
              tableRes.appendChild(row)
              aveWait += resultHolder[i][0][j].waiting;
              aveRes += resultHolder[i][0][j].response;
              aveTurn += resultHolder[i][0][j].turnaround;
            }
            tableRes.appendChild(tbl);
            aveRes = aveRes / resultHolder[i][0].length;
            aveWait = aveWait / resultHolder[i][0].length;
            aveTurn = aveTurn / resultHolder[i][0].length;
            //average

            ave.innerHTML =
              `<h4>Averages:</h4>` +
              `<p>Average Response Time: ${aveRes.toFixed(3)}</p>` +
              `<p>Average Waiting Time: ${aveWait.toFixed(3)}</p>` +
              `<p>Average Turnaround Time:  ${aveTurn.toFixed(3)}</p>`;
            //gannt
            gnt.innerHTML = '<h4>Gantt Chart:</h4>';
            var gan = document.createElement('table')
            var procs = document.createElement('tr')
            procs.innerHTML +=
              `<th class='blank'></th>`
            for (var k = 0; k < resultHolder[i][1].length; k++) {
              procs.innerHTML +=
                `<th class='process-names'>P${resultHolder[i][1][k]}</th>`
            }
            gan.appendChild(procs)
            var bounds = document.createElement('tr')
            bounds.className = 'bounds-container'
            for (var k = 0; k < resultHolder[i][2].length; k++) {
              bounds.innerHTML +=
                `<td class='bounds'>${resultHolder[i][2][k]}</td>`
            }
            gan.appendChild(bounds)
            gnt.appendChild(gan)
          }.bind(null, i))

        }

      }
      else {
        alert('Error: Missing/no values detected. Please fill all fields')
      }
    }
    else {
      if (!parsedData?.length) alert('Error: File type not valid.')
      else if (isRoundRobin && tq == 0) alert('Error: Time quantum not set.')
      else alert('Error: No algorithm chosen. Please choose atleast one to proceed')
    }
  }

  var resultHolder = [] as (JSON[] | number[])[];
  //algorithms
  const fcfs = (process: JSON[]) => {

    var waiting = [] as Array<JSON>;
    var active = null;
    var finished = [] as Array<JSON>;

    //gantt related
    var bounds = [] as Array<number>;
    var gannt = [] as Array<number | String>;

    var algoRes = [] as Array<JSON[] | number[]>;
    var totaltime = 0 as number;
    var posstart = [] as Array<number>;
    for (var f of process) {
      totaltime += f.burst;
      posstart.push(f.arrival)
    }
    
    posstart = posstart.sort(
      (p1, p2) => (p1 > p2) ? 1 :
        (p1 < p2) ? -1 : 0)

    var b: number = 0;
    var atleast = posstart[posstart.length - 1] + posstart[0];

    if(atleast > totaltime){
      totaltime+= atleast - totaltime;
    }
    //added for arrival starting at nonzero
    else if(posstart[0] != 0){
      totaltime += posstart[0];
    }
    
    for (var i = 0; i < totaltime; i++) {
      //enter process in waiting queue
      for (var f of process) {
        if (f.arrival === i) waiting.push(f)
      }
      //pop the first process, if active is null

      if (active === null) {
        if (waiting.length != 0) {
          active = waiting.shift()
          b = active.burst
          active.waiting = i - active.arrival
          active.response = i - active.arrival
          bounds.push(i)
          gannt.push(active.process)
        }
        else{
          //self note
          //will be repeated if next iteration is still active == null and no waiting
          //needs some sort of flag to work as expected
          gannt.push('X')
          bounds.push(i)
        }
      }

      //minus burst

      if (active != null) active.burst--;

      //if burst is 0, push active to finish

      if (active != null && active.burst === 0) {
        active.completion = i + 1
        active.burst = b
        active.turnaround = active.completion - active.arrival
        if (i === totaltime - 1) bounds.push(active.completion)
        finished.push(active);
        active = null;
      }

    }
    //sort by process number
    finished = finished.sort(
      (p1, p2) => (p1.process > p2.process) ? 1 :
        (p1.process < p2.process) ? -1 : 0)

    algoRes.push(finished, gannt, bounds);

    return algoRes;
  }

  const sjf = (process: JSON[]) => {
    var waiting = [] as Array<JSON>;
    var active = null;
    var finished = [] as Array<JSON>;
    var totaltime = 0 as number;

    var bounds = [] as Array<number>;
    var gannt = [] as Array<number | String>;
    var posstart = [] as Array<number>;
    var algoRes = [] as Array<JSON[] | number[]>;
    for (var p of process) {
      totaltime += p.burst;
      posstart.push(p.arrival)
    }
    var b: number = 0;

    posstart = posstart.sort(
      (p1, p2) => (p1 > p2) ? 1 :
        (p1 < p2) ? -1 : 0)

        var atleast = posstart[posstart.length - 1] + posstart[0];

        if(atleast > totaltime){
          totaltime+= atleast - totaltime;
        }
        //added for arrival starting at nonzero
    else if(posstart[0] != 0){
      totaltime += posstart[0];
    }

    for (var i = 0; i < totaltime; i++) {
      //enter process in waiting queue
      for (var p of process) {
        if (p.arrival == i) waiting.push(p)
      }
      //sort by smallest burst
      if (waiting.length != 0) {
        waiting = waiting.sort(
          (p1, p2) => (p1.burst > p2.burst) ? 1 :
            (p1.burst < p2.burst) ? -1 : 0)
      }


      //pop process if active is null

      if (active === null) {
        if (waiting.length != 0) {
          active = waiting.shift()
          b = active.burst
          active.waiting = i - active.arrival
          active.response = i - active.arrival
          bounds.push(i)
          gannt.push(active.process)
        }
        else{
          gannt.push('X')
          bounds.push(i)
        }
      }
      //minus burst
      if (active != null) active.burst--;

      // if active is 0, push active to finished

      if (active != null && active.burst === 0) {
        active.completion = i + 1
        active.burst = b
        active.turnaround = active.completion - active.arrival
        if (i === totaltime - 1) bounds.push(active.completion)
        finished.push(active);
        active = null;
      }
    }
    //sort by process number
    finished = finished.sort(
      (p1, p2) => (p1.process > p2.process) ? 1 :
        (p1.process < p2.process) ? -1 : 0)


    algoRes.push(finished, gannt, bounds);

    return algoRes;
  }

  const prioNP = (process: JSON[]) => {
    var waiting = [] as Array<JSON>;
    var active = null;
    var finished = [] as Array<JSON>;
    var bounds = [] as Array<number>;
    var gannt = [] as Array<number | String>;
    var posstart = [] as Array<number>;
    var algoRes = [] as Array<JSON[] | number[]>;
    var totaltime = 0 as number;
    for (var p of process) {
      totaltime += p.burst;
      posstart.push(p.arrival)
    }
    var b: number = 0;
    
    posstart = posstart.sort(
      (p1, p2) => (p1 > p2) ? 1 :
        (p1 < p2) ? -1 : 0)
        var atleast = posstart[posstart.length - 1] + posstart[0];

    if(atleast > totaltime){
      totaltime+= atleast - totaltime;
    }
    //added for arrival starting at nonzero
    else if(posstart[0] != 0){
      totaltime += posstart[0];
    }

    for (var i = 0; i < totaltime; i++) {
      //enter process in waiting queue
      for (var p of process) {
        if (p.arrival == i) waiting.push(p)
      }
      //sort by priority ascending 
      if (waiting.length != 0) {
        waiting = waiting.sort(
          (p1, p2) => (p1.priority > p2.priority) ? 1 :
            (p1.priority < p2.priority) ? -1 : 0)
      }

      //pop process if active is null

      if (active === null) {
        if (waiting.length != 0) {
          active = waiting.shift()
          b = active.burst
          active.waiting = i - active.arrival
          active.response = i - active.arrival
          bounds.push(i)
          gannt.push(active.process)
        }
        else{
          gannt.push('X')
          bounds.push(i)
        }
      }
      //minus burst
      if (active != null) active.burst--;

      // if active is 0, push active to finished

      if (active != null && active.burst === 0) {
        active.completion = i + 1
        active.burst = b
        active.turnaround = active.completion - active.arrival
        if (i === totaltime - 1) bounds.push(active.completion)
        finished.push(active);

        active = null;
      }

    }
    //sort by process number
    finished = finished.sort(
      (p1, p2) => (p1.process > p2.process) ? 1 :
        (p1.process < p2.process) ? -1 : 0)

    algoRes.push(finished, gannt, bounds);

    return algoRes;
  }

  const roundRobin = (process: JSON[], tq: number) => {
    var waiting = [] as Array<JSON>;
    var active = null;
    var finished = [] as Array<JSON>;
    var totaltime = 0 as number;
    var bounds = [] as Array<number>;
    var gannt = [] as Array<number | String>;
    var posstart = [] as Array<number>;
    var algoRes = [] as Array<JSON[] | number[]>;
    var isFirstEnter = [] as Array<boolean>;
    var b = [] as Array<number>;
    for (var p of process) {
      totaltime += p.burst;
      isFirstEnter.push(true);
      b.push(-1);
      posstart.push(p.arrival)
    }
    posstart = posstart.sort(
      (p1, p2) => (p1 > p2) ? 1 :
        (p1 < p2) ? -1 : 0)
        var atleast = posstart[posstart.length - 1] + posstart[0];

    if(atleast > totaltime){
      totaltime+= atleast - totaltime;
    }
    //added for arrival starting at nonzero
    else if(posstart[0] != 0){
      totaltime += posstart[0];
    }

    var qburst: number = tq;
    for (var i = 0; i < totaltime; i++) {
      //enter process in waiting queue
      for (var p of process) {
        if (p.arrival == i) waiting.push(p)
      }
      //check if time quantum is zero, put it back (if not null) in waiting if yes
      if (qburst === 0) {
        //console.log("wait "+ active.process)
        qburst = tq;
        waiting.push(active);
        active = null;
      }

      //pop process if active is null
      if (active === null) {
        if (waiting.length != 0) {
          active = waiting.shift()
          if (isFirstEnter[active.process - 1]) {
            isFirstEnter[active.process - 1] = !isFirstEnter[active.process - 1];
            b[active.process - 1] = active.burst
            active.response = i - active.arrival;
          }
          bounds.push(i)
          gannt.push(active.process)
        }
        else{
          gannt.push('X')
          bounds.push(i)
        }
      }

      //minus burst, minus qburst left
      if (active != null) {
        active.burst--;
        qburst--;
      }


      //check if burst time is zero, put it in finished if yes

      if (active != null && active.burst === 0) {
        //console.log("fin "+ active.process)
        active.completion = i + 1;
        active.burst = b[active.process - 1];
        active.turnaround = active.completion - active.arrival;
        active.waiting = active.turnaround - active.burst
        if (i === totaltime - 1) bounds.push(active.completion)
        finished.push(active);
        active = null;
        qburst = tq;
      }
    }
    //sort by process number
    finished = finished.sort(
      (p1, p2) => (p1.process > p2.process) ? 1 :
        (p1.process < p2.process) ? -1 : 0)

    algoRes.push(finished, gannt, bounds);

    return algoRes;
  }

  const srtf = (srrtfProc: JSON[]) => {
    var waiting = [] as Array<JSON>;
    var active = null;
    var finished = [] as Array<JSON>;
    var totaltime = 0 as number;
    var bounds = [] as Array<number>;
    var gannt = [] as Array<number | String>;
    var posstart = [] as Array<number>;
    var algoRes = [] as Array<JSON[] | number[]>;
    var isFirstEnter = [] as Array<boolean>;
    var b = [] as Array<number>;
    for (var p of srrtfProc) {
      totaltime += p.burst;
      isFirstEnter.push(true);
      b.push(-1);
      posstart.push(p.arrival)
    }
    posstart = posstart.sort(
      (p1, p2) => (p1 > p2) ? 1 :
        (p1 < p2) ? -1 : 0)
        var atleast = posstart[posstart.length - 1] + posstart[0];

    if(atleast > totaltime){
      totaltime+= atleast - totaltime;
    }
    //added for arrival starting at nonzero
    else if(posstart[0] != 0){
      totaltime += posstart[0];
    }

    for (var i = 0; i < totaltime; i++) {
      //enter process in waiting queue
      for (var p of srrtfProc) {
        if (p.arrival == i) waiting.push(p)
      }
      //sort by burst time
      if (waiting.length != 0) {
        waiting = waiting.sort(
          (p1, p2) => (p1.burst > p2.burst) ? 1 :
            (p1.burst < p2.burst) ? -1 : 0)
      }

      //compare active (if not null) to first element in waiting
      //if larger, put it at the end of waiting, then set active to null
      if (active != null) {
        if (waiting.length != 0) {
          if (active.burst > waiting[0].burst) {
            waiting.push(active);
            active = null;
          }
        }
      }

      //pop process if active is null
      if (active === null) {
        if (waiting.length != 0) {
          active = waiting.shift()
          if (isFirstEnter[active.process - 1]) {
            isFirstEnter[active.process - 1] = !isFirstEnter[active.process - 1];
            b[active.process - 1] = active.burst;
            active.response = i - active.arrival;
          }
          bounds.push(i)
          gannt.push(active.process)
        }
        else{
          gannt.push('X')
          bounds.push(i)
        }
      }

      //minus burst
      if (active != null) active.burst--;
      //check if burst time is zero, put it in finished if yes
      if (active != null && active.burst === 0) {
        active.completion = i + 1;
        active.burst = b[active.process - 1];
        active.turnaround = active.completion - active.arrival;
        active.waiting = active.turnaround - active.burst
        if (i === totaltime - 1) bounds.push(active.completion)
        finished.push(active);
        active = null;
      }

    }
    //sort by process number
    finished = finished.sort(
      (p1, p2) => (p1.process > p2.process) ? 1 :
        (p1.process < p2.process) ? -1 : 0)

    algoRes.push(finished, gannt, bounds);

    return algoRes;
  }

  const prioP = (process: JSON[]) => {
    var waiting = [] as Array<JSON>;
    var active = null;
    var finished = [] as Array<JSON>;
    var totaltime = 0 as number;
    var bounds = [] as Array<number>;
    var gannt = [] as Array<number | string>;
    var posstart = [] as Array<number>;
    var algoRes = [] as Array<JSON[] | number[]>;
    var isFirstEnter = [] as Array<boolean>;
    var b = [] as Array<number>;
    for (var p of process) {
      totaltime += p.burst;
      isFirstEnter.push(true);
      b.push(-1);
      posstart.push(p.arrival)
    }
    posstart = posstart.sort(
      (p1, p2) => (p1 > p2) ? 1 :
        (p1 < p2) ? -1 : 0)
        var atleast = posstart[posstart.length - 1] + posstart[0];

    if(atleast > totaltime){
      totaltime+= atleast - totaltime;
    }
    //added for arrival starting at nonzero
    else if(posstart[0] != 0){
      totaltime += posstart[0];
    }

    for (var i = 0; i < totaltime; i++) {
      //enter process in waiting queue
      for (var p of process) {
        if (p.arrival == i) waiting.push(p)
      }
      //sort by priority number
      if (waiting.length != 0) {
        waiting = waiting.sort(
          (p1, p2) => (p1.priority > p2.priority) ? 1 :
            (p1.priority < p2.priority) ? -1 : 0)
      }

      //compare active (if not null) to first element in waiting
      //if larger, put it at the end of waiting, then set active to null
      if (active != null) {
        if (waiting.length != 0) {
          if (active.priority > waiting[0].priority) {
            //tiebreaker issue
            waiting.push(active);
            active = null;
          }
        }
      }

      //pop process if active is null
      if (active === null) {
        if (waiting.length != 0) {
          active = waiting.shift()
          if (isFirstEnter[active.process - 1]) {
            isFirstEnter[active.process - 1] = !isFirstEnter[active.process - 1];
            b[active.process - 1] = active.burst;
            active.response = i - active.arrival;
          }
          bounds.push(i)
          gannt.push(active.process)
        }
        else{
          gannt.push('X')
          bounds.push(i)
        }
      }

      //minus burst

      if (active != null) active.burst--;

      //check if burst time is zero, put it in finished if yes
      if (active != null && active.burst === 0) {
        //console.log(active.process + ` fin ${i+1}`)
        active.completion = i + 1;
        active.burst = b[active.process - 1];
        active.turnaround = active.completion - active.arrival;
        active.waiting = active.turnaround - active.burst
        if (i === totaltime - 1) bounds.push(active.completion)
        finished.push(active);
        active = null;
      }
    }
    //sort by process number
    finished = finished.sort(
      (p1, p2) => (p1.process > p2.process) ? 1 :
        (p1.process < p2.process) ? -1 : 0)

    algoRes.push(finished, gannt, bounds);

    return algoRes;
  }



  let algorithmProcess = (process: JSON[], tq: number) => {
    var results = [] as Array<Array<JSON> | Array<number>>;


    if (isFCFS) {
      var copy = [] as JSON[];
      for (var f of process) {
        var processJSON = JSON.parse(`{"process":${f.process}, "arrival":${f.arrival}, "burst":${f.burst}, "priority":${f.priority}, 
        "completion": ${f.completion}, "response": ${f.response}, "waiting": ${f.waiting}, "turnaround": ${f.turnaround}}`)
        copy.push(processJSON)
      }
      results.push(fcfs(copy))
    }
    if (isSJF) {
      var copy = [] as JSON[];
      for (var f of process) {
        var processJSON = JSON.parse(`{"process":${f.process}, "arrival":${f.arrival}, "burst":${f.burst}, "priority":${f.priority}, 
        "completion": ${f.completion}, "response": ${f.response}, "waiting": ${f.waiting}, "turnaround": ${f.turnaround}}`)
        copy.push(processJSON)
      }
      results.push(sjf(copy))
    }
    if (isSRTF) {
      var copy = [] as JSON[];
      for (var f of process) {
        var processJSON = JSON.parse(`{"process":${f.process}, "arrival":${f.arrival}, "burst":${f.burst}, "priority":${f.priority}, 
        "completion": ${f.completion}, "response": ${f.response}, "waiting": ${f.waiting}, "turnaround": ${f.turnaround}}`)
        copy.push(processJSON)
      }
      results.push(srtf(copy))
    }
    if (isPriorityNonPreemptive) {
      var copy = [] as JSON[];
      for (var f of process) {
        var processJSON = JSON.parse(`{"process":${f.process}, "arrival":${f.arrival}, "burst":${f.burst}, "priority":${f.priority}, 
        "completion": ${f.completion}, "response": ${f.response}, "waiting": ${f.waiting}, "turnaround": ${f.turnaround}}`)
        copy.push(processJSON)
      }
      results.push(prioNP(copy))
    }
    if (isPriorityPreemptive) {
      var copy = [] as JSON[];
      for (var f of process) {
        var processJSON = JSON.parse(`{"process":${f.process}, "arrival":${f.arrival}, "burst":${f.burst}, "priority":${f.priority}, 
        "completion": ${f.completion}, "response": ${f.response}, "waiting": ${f.waiting}, "turnaround": ${f.turnaround}}`)
        copy.push(processJSON)
      }
      results.push(prioP(copy))
    }
    if (isRoundRobin) {
      var copy = [] as JSON[];
      for (var f of process) {
        var processJSON = JSON.parse(`{"process":${f.process}, "arrival":${f.arrival}, "burst":${f.burst}, "priority":${f.priority}, 
        "completion": ${f.completion}, "response": ${f.response}, "waiting": ${f.waiting}, "turnaround": ${f.turnaround}}`)
        copy.push(processJSON)
      }
      results.push(roundRobin(copy, tq))
    }

    return results;
  }

  const rsg = () => {
    var letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var letter: string = letters.charAt(Math.floor(Math.random() * letters.length));
    return `${letter}${Math.random().toString(36).substring(2, 7)}`;
  }

  const addRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let tablebody = document.querySelector('.table') as HTMLTableElement;
    let row = document.createElement('tr') as HTMLTableRowElement;
    var process_count: number = tablebody.childNodes.length + 1;
    row.className = rsg()
    let clsname = row.className;
    let pidrow = document.createElement('td') as HTMLTableCellElement;
    pidrow.innerHTML = `P${process_count}`;
    row.appendChild(pidrow)
    for (let i = 0; i < 3; i++) {
      let inputrow = document.createElement('td') as HTMLTableCellElement;
      let input = document.createElement('input') as HTMLInputElement;
      input.type = 'number';
      input.min = '0';
      input.className = `i${i} numInp`;
      inputrow.appendChild(input);
      row.appendChild(inputrow);
    }
    let delrow = document.createElement('td') as HTMLTableCellElement;
    let delbutton = document.createElement('button') as HTMLButtonElement;
    delbutton.innerHTML = 'Delete';
    delbutton.onclick = (e) => {
      e.preventDefault();
      //console.log(`deleting ${clsname}`)
      var delt = document.querySelector(`.${clsname}`) as HTMLTableRowElement;
      delt.remove();
      process_count--;

      var tblbody = document.querySelector('.table') as HTMLTableElement;
      for (let i = 0; i < tblbody.childElementCount; i++) {
        tblbody.childNodes[i].childNodes[0].innerHTML = `P${i + 1}`;
      }
    }
    delrow.appendChild(delbutton);
    row.appendChild(delrow);
    tablebody.appendChild(row);
  }

  return (
    <div className="App flex-container">
      <div className='flex-child containers lcontainer'>
        <div>
          <h3>You can input the processes into the table below:</h3>
          <table>
            <thead>
              <tr>
                <th>Process ID</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                <th>Priority Number</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='table'></tbody>
          </table>
          <button onClick={addRow}>Add A Row</button>
          <h3>or upload your .csv file below:</h3>
          <input type="file" name="file" accept='text/csv' onChange={handleChange}></input>
        </div>
        <p>(note: if both is used, .csv file input will be used)</p>
        <h3>Then, choose the scheduling algorithm/s you want to use:</h3>
        <div>
          <Checkbox handleChange={handleFCFS}
            isChecked={isFCFS}
            label="FCFS"
          />

          <Checkbox handleChange={handleSJF}
            isChecked={isSJF}
            label="SJF"
          />

          <Checkbox handleChange={handleSRTF}
            isChecked={isSRTF}
            label="SRTF"
          />

          <Checkbox handleChange={handlePriorityNonPreemptive}
            isChecked={isPriorityNonPreemptive}
            label="Priority Non Preemptive"
          />

          <Checkbox handleChange={handlePriorityPreemptive}
            isChecked={isPriorityPreemptive}
            label="Priority Preemptive"
          />

          <Checkbox handleChange={handleRoundRobin}
            isChecked={isRoundRobin}
            label="Round Robin"
          />

          <div className='tquan'>
            <label htmlFor="timequantum">Time Quantum:</label>
            <input type='number' min='1' id='timequantum'></input>
          </div>

          <button onClick={startProcess}>Start</button>
        </div>
      </div>
      <div className='result-page flex-child containers rcontainer'>
        <h4>Results:</h4>
        <div className='buttonset'></div>
        <div className='results'></div>
        <div className='averages'></div>
        <div className='gannt'></div>
      </div>

    </div>
  )
}

export default App

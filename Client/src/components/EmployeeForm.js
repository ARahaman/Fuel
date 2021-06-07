import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { getData, postData } from '../utils/rest-util';
import '../App.css';
import { runInThisContext } from 'vm';
import { get } from 'http';

class EmployeeForm extends Component {
  constructor () {
    super();
    this.state = {
        actualData: [],
        isManager: sessionStorage.getItem('designation')==="manager",
        isSubmitted: false,
        workSheet: [
            { name: 'Motor Pass', ref: React.createRef() },
            { name: 'Motor Charge', ref: React.createRef() },
            { name: 'Fleet', ref: React.createRef() },
            { name: 'Eftpos', ref: React.createRef() },
            { name: 'Amex', ref: React.createRef() },
            { name: 'Diners', ref: React.createRef() },
            { name: 'United Cards', ref: React.createRef() },
            { name: 'Man United Card', ref: React.createRef() },
            { name: 'Inabilities', ref: React.createRef() },
            { name: 'Drive Offs', ref: React.createRef() },
            { name: 'Safe Amt', ref: React.createRef() },
            { name: 'Manual Final Drop', ref: React.createRef() },
            { name: 'Total From Above', ref: React.createRef() },
            { name: 'Net Sales', ref: React.createRef() },
            { name: 'Difference', ref: React.createRef() },
            { name: 'Shop Sales', ref: React.createRef() },
            { name: 'Touch EPAY 1 (-)', ref: React.createRef() },
            { name: 'Touch EPAY 2 (-)', ref: React.createRef() },
            { name: 'Surcharge', ref: React.createRef() },
            { name: 'NET SHOP', ref: React.createRef() },
            { name: 'Pie Face', ref: React.createRef() },
            { name: '-', ref: React.createRef() },
            { name: 'Refunds', ref: React.createRef() },
            { name: 'Cleared Items', ref: React.createRef() },
            { name: 'Cancels', ref: React.createRef() },
            { name: 'No Sales', ref: React.createRef() },
            { name: 'Customer Count', ref: React.createRef() }
        ],
        managerSheet: [
          { name: 'Day', ref: React.createRef() },
          { name: ''},
          { name: 'B/Fwd Fuel', ref: React.createRef() },
          { name: 'Total Fuel', ref: React.createRef() },
          { name: 'Touch E-Pay', ref: React.createRef() },
          { name: 'Credit Sales', ref: React.createRef() },
          { name: 'Fuel Comm', ref: React.createRef() },
          { name: 'Shop Rent', ref: React.createRef() },
          { name: 'Insurance', ref: React.createRef() },
          { name: 'Others', ref: React.createRef() },
          { name: 'Banking', ref: React.createRef() },
          { name: 'Ref. Number', ref: React.createRef() },
          { name: ''},
          { name: 'United Lts', ref: React.createRef() },
          { name: 'United $', ref: React.createRef() },
          { name: ''},
          { name: 'POS Shop', ref: React.createRef() },
          { name: 'Net Shop', ref: React.createRef() },
          { name: 'Pie Face Sale', ref: React.createRef() },
          { name: ''},
          { name: 'Payouts/Inabilites/Doff\'s', ref: React.createRef() },
          { name: ''},
          { name: ''},
          { name: ''},
          { name: ''},
          { name: ''},
          { name: ''},
          { name: ''}
      ],
        managerData: [],
          workerData: {
            // 'Worker Name': [{ name: 'name', ref: React.createRef() },{}],
            'Motor Pass': [{ name: 'Motor Pass', ref: React.createRef() },{disabled: true},{ name: 'B/Fwd Fuel', disabled: true}],
            'Motor Charge': [{ name: 'Motor Charge', ref: React.createRef() },{disabled: true},{ name: 'Total Fuel', disabled: true}],
            'Fleet': [{ name: 'Fleet', ref: React.createRef() },{disabled: true},{ name: 'Touch E-Pay', disabled: true}],
            'Eftpos': [{ name: 'Eftpos', ref: React.createRef() },{disabled: true},{ name: 'Credit Sales', disabled: true}],
            'Amex': [{ name: 'Amex', ref: React.createRef() },{disabled: true},{ name: 'Fuel Comm', disabled: true}],
            'Diners': [{ name: 'Diners', ref: React.createRef() },{disabled: true},{ name: 'Shop Rent', disabled: true}],
            'United Cards': [{ name: 'United Cards', ref: React.createRef() },{disabled: true},{ name: 'Insurance', disabled: true}],
            'Man United Card': [{ name: 'Man United Card', ref: React.createRef() },{disabled: true},{ name: 'Others',disabled: true }],
            'Inabilities': [{ name: 'Inabilities', ref: React.createRef() },{disabled: true},{ name: 'Banking',disabled: true }],
            'Drive Offs': [{ name: 'Drive Offs', ref: React.createRef() },{disabled: true},{ name: 'Ref. Number',disabled: true }],
            'Safe Amt': [{ name: 'Safe Amt', ref: React.createRef() },{disabled: true},{disabled: true }],
            'Manual Final Drop': [{ name: 'Manual Final Drop', ref: React.createRef() },{disabled: true},{ name: 'United Lts',disabled: true }],
            'Total From Above': [{ name: 'Total From Above', ref: React.createRef() },{disabled: true},{ name: 'United $',disabled: true }],
            'Net Sales': [{ name: 'Net Sales', ref: React.createRef() },{disabled: true},{disabled: true}],
            'Difference': [{ name: 'Difference', ref: React.createRef() },{disabled: true},{ name: 'POS Shop',disabled: true}],
            'Shop Sales': [{ name: 'Shop Sales', ref: React.createRef() },{disabled: true},{ name: 'Net Shop',disabled: true}],
            'Touch EPAY 1 (-)': [{ name: 'Touch EPAY 1 (-)', ref: React.createRef() },{disabled: true},{ name: 'Pie Face Sale',disabled: true}],
            'Touch EPAY 2 (-)': [{ name: 'Touch EPAY 2 (-)', ref: React.createRef() },{disabled: true},{disabled: true}],
            'Surcharge': [{ name: 'Surcharge', ref: React.createRef() },{disabled: true},{ name: 'Payouts/Inabilites/Doff\'s',disabled: true}],
            'NET SHOP': [{ name: 'NET SHOP', ref: React.createRef() },{disabled: true},{disabled: true}],
            'Pie Face': [{ name: 'Pie Face', ref: React.createRef() },{disabled: true},{disabled: true}],
            '-': [],
            'Refunds': [{ name: 'Refunds', ref: React.createRef() },{disabled: true},{disabled: true}],
            'Cleared Items': [{ name: 'Cleared Items', ref: React.createRef() },{disabled: true},{disabled: true}],
            'Cancels': [{ name: 'Cancels', ref: React.createRef() },{disabled: true},{disabled: true}],
            'No Sales': [{ name: 'No Sales', ref: React.createRef() },{disabled: true},{disabled: true}],
            'Customer Count': [{ name: 'Customer Count', ref: React.createRef() },{disabled: true},{disabled: true},],
        },
        managerWorkerData: {
            'Worker Name': [{disabled: true, notshow: true}],
            'Motor Pass': [{ name: 'B/Fwd Fuel', ref: React.createRef(), disabled: false }],
            'Motor Charge': [{ name: 'Total Fuel', ref: React.createRef(), disabled: false }],
            'Fleet': [{ name: 'Touch E-Pay', ref: React.createRef(), disabled: false }],
            'Eftpos': [{ name: 'Credit Sales', ref: React.createRef(), disabled: false }],
            'Amex': [{ name: 'Fuel Comm', ref: React.createRef(), disabled: false }],
            'Diners': [{ name: 'Shop Rent', ref: React.createRef(), disabled: false }],
            'United Cards': [{ name: 'Insurance', ref: React.createRef(), disabled: false }],
            'Man United Card': [{ name: 'Others', ref: React.createRef(), disabled: false }],
            'Inabilities': [{ name: 'Banking', ref: React.createRef(), disabled: false }],
            'Drive Offs': [{ name: 'Ref. Number', ref: React.createRef(), disabled: false }],
            'Safe Amt': [],
            'Manual Final Drop': [{ name: 'United Lts', ref: React.createRef(), disabled: false }],
            'Total From Above': [{ name: 'United $', ref: React.createRef(), disabled: false }],
            'Net Sales': [],
            'Difference': [{ name: 'POS Shop', ref: React.createRef(), disabled: false }],
            'Shop Sales': [{ name: 'Net Shop', ref: React.createRef(), disabled: false }],
            'Touch EPAY 1 (-)': [{ name: 'Pie Face Sale', ref: React.createRef(), disabled: false }],
            'Touch EPAY 2 (-)': [],
            'Surcharge': [{ name: 'Payouts/Inabilites/Doff\'s', ref: React.createRef(), disabled: false }],
            'NET SHOP': [],
            'Pie Face': [{disabled: true}],
            '-': [],
            'Refunds': [{disabled: true}],
            'Cleared Items': [{disabled: true}],
            'Cancels': [{disabled: true}],
            'No Sales': [{disabled: true}],
            'Customer Count': [{disabled: true}]
        },
        managersheetSet:{}
    }
  }

  async componentDidMount () {
    let managerWorkerData = this.state.managerWorkerData;
    let isSubmitted = false;
    let managersheetSet = [];
    let workerData = [];
    let managersheet = [];
    if(this.state.isManager){
      managersheet = await getData('managersheet');
      if(managersheet.data[0]){
      managersheet = managersheet.data && JSON.parse(managersheet.data[0].worksheet);
      managersheetSet = {};
      managersheet.forEach(field=>{
        if(field.name){
          managersheetSet[field.name] = field.value;
        }
      })
      }
    }
    workerData = await getData('worksheets/worker');
    workerData = workerData.data;
    if (workerData && workerData.worksheet && workerData.worksheet.length){
      workerData = JSON.parse(workerData.worksheet);
      isSubmitted = true;
    } else {
      workerData = this.state.workSheet;
    }
    let managerData = await getData('/worksheets');
    managerData = managerData.data;
    if (this.state.isManager && managerData && managerData.length){
        this.setState({ managerData: managerData });
        managerWorkerData = this.state.managerWorkerData;
        // managerWorkerData.forEach((k,field)=>{
        for(let key in managerWorkerData){
          if(managerWorkerData[key] && managerWorkerData[key][0] && managerWorkerData[key][0].name && managersheetSet[managerWorkerData[key][0].name]){
            managerWorkerData[key][0].value = managersheetSet[managerWorkerData[key][0].name];
            managerWorkerData[key][0].disabled = true;
          }
        }
    
        // });
        managerData.forEach(worker=>{
            let workSheets = JSON.parse(worker.worksheet);
            managerWorkerData['Worker Name'].unshift(worker.workerid.name);
            workSheets.forEach(worksheet => {
              managerWorkerData[worksheet.name] && managerWorkerData[worksheet.name].unshift(worksheet.value);
            });
        });
    }
    console.log(this.state.managerWorkerData);
    this.setState({ workSheet: workerData, isSubmitted: isSubmitted, managerWorkerData: managerWorkerData, actualData: this.state.isManager ? this.state.managerWorkerData : this.state.workerData, managersheetSet: managersheetSet});
  }

  async submitForm(e){
    let workSheet = {};
    if (!this.state.isManager){
      workSheet = Object.values(this.state.workerData).map(field=>{
        return ({name: field[0] && field[0].name, value: field[0] && field[0].ref.current.value});
      });
      workSheet = await postData('worksheets', workSheet);
    } else {
      workSheet = []
        Object.values({...this.state.managerWorkerData}).map(values=>values.pop()).map(field => {
          workSheet.push({name: field && field.name, value: field && field.ref && field.ref.current.value});
      });
      workSheet = await postData('managersheet', workSheet);
    }
    //e.preventDefault();
    window.location.href = '/';
  }

  render () {
    return (
      <React.Fragment>
        <Container className="employeeform">
          <Row>
            <Col>
                <Form onSubmit={(e)=>{ this.submitForm(e) }}>
                    {
                        this.state.isSubmitted && this.state.workSheet.map((field, i) => 
                            <Form.Group controlId="" key={i}>
                                {field.name?<><Form.Label>{field.name}:</Form.Label><Form.Control type="number" value={field.value} disabled={true}/></>:''}
                            </Form.Group>
                        )
                    }
                    {/* <Button variant="primary" type="submit">
                        Submit
                    </Button> */}
                </Form>
              </Col>  
            </Row>
        </Container>
        <Container>
            <Row>
              <Col>
              {(!this.state.isSubmitted || this.state.isManager) && sessionStorage.getItem('authorization') ? 
              <Form>
                <table border='1' style={{display: 'inline-block', overflow:'scroll', maxWidth: '100%', border: 'solid 2px #185e84', background: '#fff'}}>
                    <tr>
                        <th>Date: { (new Date()).toLocaleDateString() }</th>
                        {/* <th></th> */}
                        {/* <th></th> */}
                        {/* <th></th> */}
                        <th colSpan={ this.state.actualData['Worker Name'] && this.state.actualData['Worker Name'].length-1 || 4}></th>
                        <th>Day</th>
                        <th>{ new Date().toLocaleDateString() }</th>
                    </tr>
                    <tr>
                        <th>Operator Name</th>
                        { 
                          this.state.actualData['Worker Name'] && this.state.actualData['Worker Name'].map(worker=>
                            {
                              return (
                                (typeof(worker) === "object")?
                                <React.Fragment>
                                  <td>{worker.name}</td>
                                  <td><input type='number' style={{ visibility: worker.disabled==true?'hidden':'' }} ref={worker.ref} disabled={worker.disabled}/></td>
                                </React.Fragment>
                                :<th>{worker}</th>
                              )  
                            }
                          ) 
                          }
                    </tr>
                    {
                        this.state.workSheet.map((worksheet, i) => 
                            <tr style={{ backgroundColor: worksheet.name==='-'? '#ebebe4':'#FFF'}}>
                                <td>{worksheet.name==='-'?'.':worksheet.name}</td> 
                                { 
                                    this.state.actualData[worksheet.name] && this.state.actualData[worksheet.name].map(value => 
                                    { 
                                      return (
                                        typeof(value) === "object"?
                                          <React.Fragment>
                                            {this.state.isManager || value.disabled?<td>{value.name}</td>:<td></td>}
                                            <td><input type='number' value={value.value} ref={value.ref} disabled={ ((value.disabled || !value.name)===true)?true:false} /></td>
                                          </React.Fragment>
                                          : <td><input type='number' value={value} disabled={true} /></td>
                                       )
                                    })
                                }
                            </tr>
                        )
                    }
                    <tr><td colSpan={this.state.actualData['Worker Name'] && this.state.actualData['Worker Name'].length+1 || 2}></td>
                      <td>
                      <center><Button variant="primary" onClick={(e)=>{ this.submitForm(e) }}>
                          Submit
                      </Button></center>
                    </td></tr>
                </table>
                </Form>
                :
                ''
                }
                {/* <table border='1' style={{display: 'inline-block'}}>
                    {
                        this.state.managerSheet.map((worksheet, i) => 
                            <tr>
                                <td>{worksheet.name}</td>
                                <td><input type='number' /></td>
                            </tr>
                        )
                    }
                </table> */}
                </Col>
            </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default EmployeeForm;

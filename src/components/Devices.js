import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getDevicesA, editDeviceA, saveDeviceA, getHeaderPropA } from '../store/actions';

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import cardReader from '../img/card-reader.png';
import cashAcceptor from '../img/cash-acceptor.png';
import cashDispenser from '../img/cash-dispenser.png';
import pos from '../img/pos.png';
import printer from '../img/printer.png';
import productDispenser from '../img/product-dispenser.png';

const styles = theme => ({
  tittleBlock: {
    fontSize: '30px',
    textAlign: 'center',
    backgroundColor: '#75aac4',
    margin: '20px 0'
  },
  p20: { padding: '20px' },
  deviceTittle: {
    textAlign: 'center',
    backgroundColor: '#59ed84',
  },
  deviceImg: {
    margin: '5px',
    padding: '10px',
    overflow: 'hidden',
    maxWidth: '150px',
    maxHeight: '250px',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  button: { backgroundColor: '#dbdddf' },
  blueColor: { color: '#0dabf7' },
  noEdit: { color: '#ed0f0f' }

});

const Devices = ({ getDevicesA, devices, classes, editDeviceA, editD, saveDeviceA, getHeaderPropA }) => {
  useEffect(() => {
    getDevicesA();
  }, [getDevicesA]);

  const [modalEdit, setModalEdit] = useState(false);
  const [nameDeviceU, setNameDeviceU] = useState('noName');
  const [nameBlockU, setNameBlockU] = useState('noName');
  const [disableBut, setDisableBut] = useState(true);
 



  const choiseImg = (img) => {
    switch (img) {
      case 'CardReader':
        return cardReader
      case 'CashAcceptor':
        return cashAcceptor
      case 'CashDispenser':
        return cashDispenser
      case 'POS':
        return pos
      case 'Printer':
        return printer
      case 'ProductDispenser':
        return productDispenser
      default:
        return img;
    }
  }

  return <div>

    {
      Object.entries(devices).map(([nameBlock, value]) => (
        <div key={nameBlock}>
          <div className={classes.tittleBlock}>{nameBlock}</div>
          <Grid container>


            {
              Object.entries(value).map(([nameDevice, valueDevice]) => (

                <Grid key={nameDevice} item xs={4} className={classes.p20}>
                  <Paper className={classes.deviceImg}>
                    <div className={classes.deviceTittle}>{nameDevice}</div>
                    <img alt={nameDevice} src={choiseImg(nameDevice)} className={classes.img} />
                  </Paper>

                  {
                    Object.entries(valueDevice[0]).map(([propName, propValue]) => (

                      <div key={propName}> {propValue.length === 0 ? null : propName + ':'}<b>
                        {
                          !Array.isArray(propValue) ? propValue :
                            propValue.map((prop, num) => (

                              <div key={num}>

                                {
                                  Object.entries(prop).map(([name, value]) => (

                                    <div key={name}>{name}: {value}</div>

                                  ))
                                }

                              </div>

                            ))
                        }

                      </b></div>

                    ))
                  }

                  <Button className={classes.button} onClick={() => { setModalEdit(true); setNameDeviceU(nameDevice); setNameBlockU(nameBlock); editDeviceA(valueDevice[0]); }}>Редактировать<EditIcon /></Button>
                </Grid>

              ))
            }

          </Grid>
        </div>
      ))
    }

    <Dialog
      open={modalEdit}
      aria-labelledby="edit-device">
      <DialogTitle id="edit-device">
        <Typography>Редактировать <span className={classes.blueColor}>{nameDeviceU}</span> </Typography>
      </DialogTitle>
      <DialogContent dividers>

        {
          Object.entries(editD).map(([propName, propValue]) => (

            <div key={propName}> {propValue.length === 0 ? null : propName + ':'}<b>

              {
                !Array.isArray(propValue) ?
                  Number.isInteger(propValue) ? <TextField
                    value={propValue}
                    name={propName}
                    onChange={e => {editDeviceA('none', e.target.name, e.target.value); setDisableBut(false) ; getHeaderPropA(nameBlockU, nameDeviceU)}}
                  />  
                    :
                    <span className={classes.noEdit}>no edit</span>
                  :
                  propValue.map((prop, num) => (

                    <div key={num}>

                      {
                        Object.entries(prop).map(([name, value]) => (

                          Number.isInteger(value) ? <div key={name}>{name} : <TextField 
                            value={value}
                            name={name}
                            onChange={e => {editDeviceA('none', e.target.name, e.target.value); setDisableBut(false); getHeaderPropA(nameBlockU, nameDeviceU)}}
                          /> </div>
                            :
                            <div key={name}>{name}: <span className={classes.noEdit}>no edit</span></div>

                        ))
                      }

                    </div>

                  ))
              }

            </b></div>

          ))
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={() => {setModalEdit(false); saveDeviceA()}} disabled={disableBut}> Сохранить </Button>
        <Button onClick={() => {setModalEdit(false); setDisableBut(true)}} color="primary">
          Отмена
          </Button>
      </DialogActions>
    </Dialog>

  </div>;
};


const mapStateToProps = state => ({
  devices: state.getDevices,
  editD: state.editDevice,
});

const mapDispatchToProps = { getDevicesA, editDeviceA, saveDeviceA, getHeaderPropA };

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Devices));
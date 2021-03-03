import React, { FC, useState, useEffect, useCallback, MouseEvent } from 'react';
import './styles.scss';
import { TYPE_LEVEL, size } from '@/constants/constants';
import { SETTINGS_INFO } from '@/constants/text';
import { SettingsProps } from './Settings.model';
import { playSound } from '@/utils/utils';
import { SOUNDS } from '@/constants/sounds';
import { createSudokuMatrix } from '@/utils/sudokuGenerator';

const Settings: FC<SettingsProps> = ({
  bgSoundOn,
  handleSoundOn,
  fieldBlockColorOn,
  difficultLevel,
  updateFieldSettings,
  updateSoundVolume,
  soundMute,
  generateNewGame
}) => {
  const levels = Object.keys(TYPE_LEVEL);
  const [colorOn, setColorOn] = useState(fieldBlockColorOn);
  const [currDifficultLevel, setCurrDifficultLevel] = useState(difficultLevel);

  useEffect(() => {
    return function () {
      console.log('sett del=' + colorOn + ' g=' + currDifficultLevel);
    };
  }, []);

  useEffect(() => {
    console.log('gener');
  
  }, [difficultLevel]);
 
  useEffect(() => {
    updateFieldSettings(colorOn, currDifficultLevel);
  }, [colorOn, currDifficultLevel]);

  const changeFieldColor = () =>{
    setColorOn(!colorOn);
    playSound(handleSoundOn.turnOn, SOUNDS.button, handleSoundOn.volume);
  }

  const changeDifficultLevel = (event:React.ChangeEvent)=>{
    const levelEl = event.target;
    setCurrDifficultLevel(TYPE_LEVEL[levelEl.id]);
    generateNewGame(createSudokuMatrix(size, TYPE_LEVEL[levelEl.id]));
    playSound(handleSoundOn.turnOn, SOUNDS.button, handleSoundOn.volume);
  }

  return (
    <div className="settings">
      <div className="settings_wrapper">
        <fieldset className="form-group">
          <legend className="text-info">{SETTINGS_INFO.bgSound}</legend>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="bgSoundOn"
              checked={bgSoundOn.turnOn}
              onChange={() => {
                playSound(handleSoundOn.turnOn, SOUNDS.button, handleSoundOn.volume);
                soundMute(!bgSoundOn.turnOn, handleSoundOn.turnOn);
              }}
            />
            <label className="custom-control-label" htmlFor="bgSoundOn">
              {SETTINGS_INFO.bgOn}
            </label>
          </div>
          <div className="sound">
            <label htmlFor="bgSoundOnVolume">{SETTINGS_INFO.volume}</label>
            <input
              type="range"
              value={bgSoundOn.volume * 100}
              className="custom-range"
              id="bgSoundOnVolume"
              onChange={event => {
                updateSoundVolume(+event.target.value, handleSoundOn.volume * 100);
              }}
            />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <legend className="text-info">{SETTINGS_INFO.handleSound}</legend>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="handleSoundOn"
              checked={handleSoundOn.turnOn}
              onChange={() => {
                playSound(handleSoundOn.turnOn, SOUNDS.button, handleSoundOn.volume);
                soundMute(bgSoundOn.turnOn, !handleSoundOn.turnOn);
              }}
            />
            <label className="custom-control-label" htmlFor="handleSoundOn">
              {SETTINGS_INFO.handleOn}
            </label>
          </div>
          <div className="sound">
            <label htmlFor="handleSoundOnVolume">{SETTINGS_INFO.volume}</label>
            <input
              type="range"
              value={handleSoundOn.volume * 100}
              className="custom-range"
              id="handleSoundOnVolume"
              onChange={event => {
                updateSoundVolume(bgSoundOn.volume * 100, +event.target.value);
              }}
            />
          </div>
        </fieldset>
        <hr />
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="fieldBlockColorOn"
            checked={colorOn}
            onChange={changeFieldColor}
          />
          <label className="custom-control-label" htmlFor="fieldBlockColorOn">
            {SETTINGS_INFO.fieldBlockColorOn}
          </label>
        </div>
        <hr />
        <fieldset>
          <legend className="text-info">{SETTINGS_INFO.difficultLevel}:</legend>
          <div className="form-group">
            {levels.map(level => {
              return (
                <div key={level} className="custom-control custom-radio">
                  <input
                    type="radio"
                    id={level}
                    name="difficultLevel"
                    className="custom-control-input"
                    checked={currDifficultLevel === TYPE_LEVEL[level]}
                    onChange={changeDifficultLevel}
                  />
                  <label className="custom-control-label" htmlFor={level}>
                    {level}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Settings;

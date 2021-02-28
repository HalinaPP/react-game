import React, { FC, useState, useEffect, useCallback } from 'react';
import './styles.scss';
import { TYPE_LEVEL } from '@/constants/constants';
import { SETTINGS_INFO } from '@/constants/text';
import { SettingsProps } from './Settings.model';

const Settings: FC<SettingsProps> = ({
  bgSoundOn,
  handleSoundOn,
  fieldBlockColorOn,
  difficultLevel,
  updateSoundVolume,
  soundMute,
}) => {
  const levels = Object.keys(TYPE_LEVEL);
  useEffect(() => {}, []);

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
              value = {handleSoundOn.volume * 100}
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
            checked={fieldBlockColorOn}
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
                    checked={difficultLevel === TYPE_LEVEL[level]}
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

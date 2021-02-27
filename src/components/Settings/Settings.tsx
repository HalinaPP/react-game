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
}) => {
  const levels = Object.keys(TYPE_LEVEL);
  useEffect(() => {}, []);

  return (
    <div className="settings">
      <div className="settings_wrapper">
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="bgSoundOn"
          checked={bgSoundOn}
        />
        <label className="custom-control-label" htmlFor="bgSoundOn">
          {SETTINGS_INFO.bgSoundOn}
        </label>
      </div>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="handleSoundOn"
          checked={handleSoundOn}
        />
        <label className="custom-control-label" htmlFor="handleSoundOn">
          {SETTINGS_INFO.handleSoundOn}
        </label>
      </div>
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
      <fieldset>
      <legend>{SETTINGS_INFO.difficultLevel}:</legend>
      <div className="form-group">
        {levels.map(level => {
          return (
            <div className="custom-control custom-radio">
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

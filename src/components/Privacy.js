import React from 'react';
import { paragraphOne } from '../Utils/PrivacyText';

const Privacy = () => (
    <div className='privacy'>
        <div className='privacy__textcontent'>
            <h2>PRIVACY POLICY</h2>   
            <p className='privacy__paragraph'> {paragraphOne} </p>
            <h4 className='privacy__title'>WHAT DATA WE COLLECT</h4>
            <p className='privacy__paragraph'> Colabi.co collects the following data for all users: </p>
            <ul>
                <li>ID cookies that are generated once and are unique for each user;</li>
                <li>The last IP address from which the user accessed the Site;</li>
            </ul>
            <p className='privacy__paragraph'>Colabi.co collects the following data for registered users:</p>
            <ul>
                <li>Email submitted when signing up;</li>
                <li>Username submitted when signing up;</li>
            </ul>
            <p className='privacy__paragraph'>Colabi.co also, naturally, stores Content posted by the users, including, but not limited to, tasks, lists and accompanied metadata.</p>
            <h4 className='privacy__title'>WHY WE COLLECT DATA</h4>
            <p className='privacy__paragraph'> Colabi.co collects the aforementioned data for the purpose of providing the services and, in case of IP addresses, to prevent potential abuse. Colabi.co is a simple but powerful service and we try to collect as little data as possible while still providing useful service.</p>
            <h4 className='privacy__title'>DATA SECURITY AND ACCESS</h4>
            <p className='privacy__paragraph'>Colabi.co securely stores the data on its servers protected by latest standards in security. The access to the data you submitted to Colabi.co during the process of registration or by using a service are visible only to you and Colabi.co administrators. Given that Colabi.co relies on sharing data, anybody with a share link can access the data pointed to that link. It's possible, in theory, that someone may guess the share link, although it's very unlikely.</p>
            <h4 className='privacy__title'>DATA SHARING AND AFFILIATED WEBSITES OR ORGANIZATIONS</h4>
            <p className='privacy__paragraph'>Colabi.co does not share your data with ANY third-party except in the case of the data being accessed via share link either shared by you or otherwise obtained without any mediation by Colabi.co.</p>
            <p className='privacy__paragraph'>Colabi.co is, currently, NOT affiliated with any website or organization.</p>
            <h4 className='privacy__title'>DATA RETENTION</h4>
            <p className='privacy__paragraph'>Colabi.co stores your data until you choose to delete your profile, in which case, we delete everything you posted using your profile.</p>
            <p className='privacy__paragraph'>In case of unregistered users, the collected data is kept for a maximum of 1 month since the last use.</p>
            <h4 className='privacy__title'>3RD PARTY SERVICES</h4>
            <p className='privacy__paragraph'>Colabi.co relies on the use of the following third party services:</p>
            <ul>
                <li><a href='https://policies.google.com/privacy'>Google reCAPTCHA</a></li>
            </ul>
            <h4 className='privacy__title'>CHANGE LOG (NEWEST FIRST):</h4>
            <ul>
                <li><span>21. July 2018:</span> Added information about collected data.</li>
                <li><span>9. June 2018:</span> Wrote initial version of this document.</li>
            </ul>
        </div>
    </div>
);

export default Privacy;
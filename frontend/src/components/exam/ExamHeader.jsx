import React from 'react';

const ExamHeader = ({ isHidden }) => {
  if (isHidden) return null;

  return (
    <div className="exam-header">
      <div className="header-top">
        <div className="logos-left">
          <img 
            src="https://www.ielts.org/-/media/images/ielts-logo-2018.ashx" 
            alt="IELTS Logo" 
            className="ielts-logo"
            style={{ height: '50px' }}
          />
        </div>
        <div className="logos-right">
          <img 
            src="https://www.britishcouncil.org/sites/default/files/british-council-logo.svg" 
            alt="British Council" 
            style={{ height: '40px', marginRight: '20px' }}
          />
          <img 
            src="https://www.idp.com/medias/idp-logo.svg" 
            alt="IDP" 
            style={{ height: '40px', marginRight: '20px' }}
          />
          <img 
            src="https://www.cambridgeenglish.org/images/cambridge-english-logo.jpg" 
            alt="Cambridge" 
            style={{ height: '40px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
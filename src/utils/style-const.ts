export const devStyle = {
  maxWidth: '1400px',
  margin: ' 20px auto 0',
  display: 'flex',
  justifyContent: 'space-around',
  '@media (max-width: 915px)': {
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

export const cardStyle = {
  width: '30%',
  margin: '0 15px',
  '@media (max-width: 915px)': {
    margin: '15px auto',
    width: '90%',
  },
};

export const descrStyle = {
  fontSize: '1.3rem',
  width: '70%',
  textAlign: 'center',
  margin: '0 auto  20px',
  '@media (max-width: 915px)': {
    fontSize: '20px',
    width: '90%',
  },
};

export const titleStyle = {
  margin: '55px auto 15px',
  fontSize: '38px',
  fontWeight: 500,
  textAlign: 'center',
  '@media (max-width: 915px)': {
    fontSize: '28px',
  },
};

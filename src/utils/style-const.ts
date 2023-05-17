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

export const descrdStyle = {
  fontSize: '24px',
  width: '70%',
  textAlign: 'center',
  margin: '0 auto  20px',
  '@media (max-width: 915px)': {
    fontSize: '24px',
    width: '90%',
  },
};

export const titleStyle = {
  margin: '20px auto 0',
  fontSize: '48px',
  fontWeight: 500,
  textAlign: 'center',
  '@media (max-width: 915px)': {
    fontSize: '32px',
  },
};

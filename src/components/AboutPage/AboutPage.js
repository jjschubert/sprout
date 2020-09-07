import React from 'react';
import { Typography } from '@material-ui/core';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div className="container">
    <div className='textBox'>
      <Typography variant='h5' color='secondary'>
        Sprout is a task management application that helps gardeners grow bountiful vegetable plants from seed.
            </Typography>

      <Typography variant='body1' id='aboutBlurb'>
        Sprout makes it easy to manage different timelines for each plant as you guide it through various stages,
        from starting seeds to caring for a sprouting seedling to preparing it for the elements to finally planting it outdoors.
        Plan and track important milestones for each plant and easily view overdue and upcoming tasks.
            </Typography>
    </div>
  </div>
);

export default AboutPage;

import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

  export const flyInOut = trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(1000)
    ]),
    transition('* => void', [
      animate(1000, style({ transform: 'translateX(100%)' }))
    ])
  ]);


  export const fadeInOutLeft = trigger('fadeInOutLeft', [
    state('in', style({ transform: 'translateX(0)' , opacity:1 })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' , opacity:0 }),
      animate(1200)
    ]),
    transition('* => void', [
      animate(400, style({ transform: 'translateX(100%)' , opacity:0  }))
    ])
  ]);
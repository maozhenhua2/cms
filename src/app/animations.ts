import {animate, animateChild, animation, group, query, style, transition, trigger} from '@angular/animations';

// export const transAnimation = animation([
//   style({
//     height: '{{ height }}',
//     opacity: '{{ opacity }}',
//     backgroundColor: '{{ backgroundColor }}'
//   }),
//   animate('{{ time }}')
// ]);

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({position: 'relative', overflow: 'hidden'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: '20px',
          left: '30px',
          width: 'calc(100% - 60px)',
          height: 'calc(100% - 40px)'
        })
      ], { optional: true }),
      query(':enter', [
        style({left: '-100%'})
      ], { optional: true }),
      // query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('0.5s ease-out', style({left: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('0.5s ease-out', style({left: '0%'}))
        ], { optional: true })
      ]),
      // query(':enter', animateChild()),
    ]),
  ]);

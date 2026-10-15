import test from 'node:test';
import assert from 'node:assert/strict';
import { isSafeForDiet, matchesCuisine, getTravelMinutes, saveData, loadData } from '../src/nomlyUtils.js';

test('conservative dietary matching', () => {
  assert.equal(isSafeForDiet({name:'Egg fried rice',ingredients:'rice, egg'}, ['Vegan']), false);
  assert.equal(isSafeForDiet({name:'Tofu rice', ingredients:'tofu, rice'}, ['Vegetarian']), true);
  assert.equal(isSafeForDiet({name:'Tofu rice', ingredients:'tofu, rice'}, ['Nut Allergy']), false);
  assert.equal(isSafeForDiet({name:'Chicken rice', ingredients:'chicken'}, ['No Beef']), true);
});
test('cuisine filtering', () => {
  assert.equal(matchesCuisine({cuisine:'Japanese'}, ['Indian']), false);
  assert.equal(matchesCuisine({cuisine:'Indian'}, ['Indian']), true);
});
test('time parsing', () => {
  assert.equal(getTravelMinutes('15 min'),15);
  assert.equal(getTravelMinutes('unknown'),Infinity);
});
test('scoped persistence', () => {
  const values = new Map();
  global.localStorage = {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
  assert.equal(saveData('a',{budget:50}),true);
  assert.equal(loadData('a').budget,50);
  assert.equal(loadData('b'),null);
});

test('plural ingredient exclusions and malformed menus', () => {
  assert.equal(isSafeForDiet({name:'Noodles',ingredients:'eggs, soy sauce'}, ['Egg-Free']), false);
  assert.equal(isSafeForDiet({name:'Prawn noodles',ingredients:'prawns'}, ['Vegetarian']), false);
  assert.equal(isSafeForDiet({name:'Butter toast',ingredients:'butter'}, ['Vegan']), false);
  assert.equal(isSafeForDiet({name:'Tofu bowl',ingredients:'tofu',menu:'none'}, ['Vegetarian']), true);
});

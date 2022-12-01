import { getInput } from '@/lib/getInput';

type Passport = Record<string, string>;

function partOne(passports: Passport[]) {
  const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  const result = passports.filter((passport) =>
    REQUIRED_FIELDS.every((field) => passport[field] !== undefined),
  ).length;

  console.log('Part One: ', result);
}

function partTwo(passports: Passport[]) {
  const validators: Record<string, (value: string) => boolean> = {
    byr: (value) => Number(value) >= 1920 && Number(value) <= 2002,
    iyr: (value) => Number(value) >= 2010 && Number(value) <= 2020,
    eyr: (value) => Number(value) >= 2020 && Number(value) <= 2030,
    hgt: (value) => {
      const unit = value.slice(value.length - 2, value.length);

      if (unit !== 'in' && unit !== 'cm') {
        return false;
      } else {
        const size = value.slice(0, value.length - 2);

        return unit === 'in'
          ? Number(size) >= 59 && Number(size) <= 76
          : Number(size) >= 150 && Number(size) <= 193;
      }
    },
    hcl: (value) =>
      value.startsWith('#') &&
      value.slice(1, value.length).length === 6 &&
      !isNaN(Number(`0x${value.slice(1, value.length)}`)),
    ecl: (value) =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: (value) =>
      value.length === 9 && value.split('').every((n) => !isNaN(Number(n))),
  };

  const result = passports.filter((passport) => {
    for (const field in validators) {
      if (!passport[field] || validators[field](passport[field]) === false) {
        return false;
      }
    }

    return true;
  }).length;

  console.log('Part Two: ', result);
}

async function main() {
  const input = await getInput(__dirname);
  const passports: Passport[] = input.split('\n\n').map((passport) => {
    const parsedPassport = passport.split('\n').join(' ').split(' ');

    return Object.fromEntries(parsedPassport.map((field) => field.split(':')));
  });

  console.log('AoC 2020 - Day 04: Passport Processing');
  partOne(passports);
  partTwo(passports);
}

if (process.argv.includes('run')) {
  void main();
}

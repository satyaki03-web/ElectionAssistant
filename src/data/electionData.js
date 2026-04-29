export const electionData = {
  India: [
    {
      id: "reg",
      title: "Voter Registration",
      duration: "Ongoing (Deadline: Variable)",
      colorCode: "#3b82f6", // Blue
      description: "Any Indian citizen 18 or older can register to vote. The process involves filling Form 6 (online via NVSP or offline) and providing proof of age and address. Think of it as creating your account to participate in the democratic process.",
      stakeholders: ["Election Commission of India (ECI)", "Citizens", "Booth Level Officers (BLO)"],
      exceptions: "If your name is missing, you must submit a new form before the deadline. If someone else registered under your name, you can file an objection using Form 7."
    },
    {
      id: "nom",
      title: "Candidate Filing",
      duration: "7 - 8 days",
      colorCode: "#06b6d4", // Teal
      description: "Candidates wishing to run for office submit their nomination papers to the Returning Officer. They must declare their assets, criminal records, and educational qualifications. It's like submitting a resume and background check for the job of a representative.",
      stakeholders: ["Candidates", "Political Parties", "Returning Officer"],
      exceptions: "Nominations can be rejected during scrutiny if papers are incomplete or false information is provided. Candidates can also withdraw their nomination within a specific window."
    },
    {
      id: "camp",
      title: "Campaign Period",
      duration: "Around 14 days",
      colorCode: "#f97316", // Orange
      description: "Candidates hold rallies, distribute pamphlets, and use media to convince voters. A strict Model Code of Conduct (MCC) is enforced to ensure fair play—meaning the ruling party cannot use government resources for campaigning.",
      stakeholders: ["Candidates", "Voters", "Media", "ECI (Monitors)"],
      exceptions: "Violating spending limits or the MCC can lead to warnings, bans on campaigning for certain periods, or even disqualification."
    },
    {
      id: "vote",
      title: "Voting Day",
      duration: "1 Day (Per Phase)",
      colorCode: "#22c55e", // Green
      description: "Citizens visit polling booths to cast their vote secretly using Electronic Voting Machines (EVMs) with VVPAT (Voter Verifiable Paper Audit Trail). Special provisions exist for senior citizens and persons with disabilities.",
      stakeholders: ["Voters", "Polling Officers", "Security Personnel", "Polling Agents"],
      exceptions: "If an EVM malfunctions, it is immediately replaced. In cases of severe booth capturing or violence, a repoll may be ordered by the ECI."
    },
    {
      id: "count",
      title: "Counting & Results",
      duration: "1 Day",
      colorCode: "#a855f7", // Purple
      description: "Votes are counted under strict security and video surveillance. The candidate with the most votes in a constituency (First Past the Post system) is declared the winner.",
      stakeholders: ["Counting Staff", "Returning Officer", "Candidates/Agents", "Media"],
      exceptions: "In extremely close contests, a candidate can request a recount of specific EVMs or postal ballots before the results are officially declared."
    },
    {
      id: "disp",
      title: "Dispute Resolution",
      duration: "Up to 6 Months",
      colorCode: "#ec4899", // Pink
      description: "If a candidate or voter believes the election was rigged or rules were broken, they can file an Election Petition in the High Court. The court reviews evidence and can uphold or void the election.",
      stakeholders: ["High Courts", "Aggrieved Candidates", "Elected Representatives"],
      exceptions: "If the court voids an election, the winning candidate loses their seat, and a by-election must be held."
    },
    {
      id: "trans",
      title: "Power Transition",
      duration: "A few weeks",
      colorCode: "#eab308", // Yellow
      description: "The ECI submits the list of winning candidates to the President/Governor. The leader of the majority party or coalition is invited to form the government and takes the oath of office.",
      stakeholders: ["President/Governor", "Prime Minister/Chief Minister", "Elected MPs/MLAs"],
      exceptions: "If no party has a clear majority (a hung parliament), the President/Governor uses discretion to invite the most likely coalition to prove their majority on the floor of the house."
    }
  ],
  USA: [
    {
      id: "reg",
      title: "Voter Registration",
      duration: "Ongoing (Deadlines vary)",
      colorCode: "#3b82f6", // Blue
      description: "Eligible US citizens must register to vote. Rules, deadlines, and methods (online, by mail, in-person) vary significantly by state. Some states allow same-day registration.",
      stakeholders: ["State Election Officials", "Citizens", "DMVs"],
      exceptions: "If purged from voter rolls, you may have to cast a provisional ballot, which is counted only after verifying eligibility."
    },
    {
      id: "nom",
      title: "Primaries & Caucuses",
      duration: "Several Months",
      colorCode: "#06b6d4", // Teal
      description: "Before the general election, political parties hold primary elections or caucuses in each state to choose their official nominee for the presidency and other offices.",
      stakeholders: ["Political Parties", "Primary Voters", "State Governments"],
      exceptions: "A brokered convention can happen if no candidate secures a majority of delegates during the primaries."
    },
    {
      id: "camp",
      title: "General Campaign",
      duration: "Several Months",
      colorCode: "#f97316", // Orange
      description: "The official nominees campaign nationwide, focusing heavily on 'swing states'. There are debates, massive ad spending, and rallies to sway undecided voters.",
      stakeholders: ["Nominees", "PACs/Super PACs", "Voters", "Media"],
      exceptions: "Campaign finance violations can lead to heavy fines. 'October surprises' can dramatically shift momentum."
    },
    {
      id: "vote",
      title: "Election Day",
      duration: "First Tuesday in Nov",
      colorCode: "#22c55e", // Green
      description: "Voters cast their ballots for electors, not directly for the president (Electoral College). Many states also offer early voting and mail-in voting.",
      stakeholders: ["Voters", "Poll Workers", "State Boards"],
      exceptions: "Provisional ballots are used if a voter's eligibility is questioned."
    },
    {
      id: "count",
      title: "Counting & Electoral College",
      duration: "Days to Weeks",
      colorCode: "#a855f7", // Purple
      description: "Votes are counted at the state level. The winner of a state's popular vote generally receives all its Electoral votes. A candidate needs 270 electoral votes to win.",
      stakeholders: ["State Officials", "Electors", "Congress"],
      exceptions: "If states have extremely close margins, automatic recounts are triggered. Legal battles over ballot validity can delay certification."
    },
    {
      id: "disp",
      title: "Dispute Resolution & Certification",
      duration: "Nov - Jan 6",
      colorCode: "#ec4899", // Pink
      description: "Lawsuits regarding election integrity are resolved in courts. States certify their results, Electors cast votes, and Congress counts and certifies them on Jan 6.",
      stakeholders: ["Courts", "State Legislatures", "Congress", "Vice President"],
      exceptions: "Congress members can object to a state's electoral votes. If sustained by both chambers, votes could be discarded."
    },
    {
      id: "trans",
      title: "Inauguration Day",
      duration: "January 20",
      colorCode: "#eab308", // Yellow
      description: "The President-elect and Vice President-elect take the oath of office at the US Capitol, officially beginning their 4-year term.",
      stakeholders: ["President-elect", "Chief Justice", "Outgoing Administration"],
      exceptions: "If election results are heavily disputed past key deadlines, the transition process can be truncated."
    }
  ],
  UK: [
    {
      id: "reg",
      title: "Voter Registration",
      duration: "Ongoing",
      colorCode: "#3b82f6", // Blue
      description: "Citizens must register on the electoral roll to vote, primarily online using a National Insurance number.",
      stakeholders: ["Electoral Commission", "Local Registration Officers", "Citizens"],
      exceptions: "Failure to register means you cannot vote. You can appeal if your application was unfairly rejected."
    },
    {
      id: "nom",
      title: "Candidate Nomination",
      duration: "Few days",
      colorCode: "#06b6d4", // Teal
      description: "Candidates submit nomination papers signed by 10 registered electors and pay a £500 deposit, lost if they fail to get 5% of the vote.",
      stakeholders: ["Candidates", "Returning Officer", "Political Parties"],
      exceptions: "Nominations can be invalid if filled incorrectly or if the candidate is legally disqualified."
    },
    {
      id: "camp",
      title: "The Short Campaign",
      duration: "5-6 weeks",
      colorCode: "#f97316", // Orange
      description: "Once Parliament dissolves, the 'short campaign' begins with strict spending limits. TV advertising by parties is banned, replaced by allocated broadcasts.",
      stakeholders: ["Parties", "Candidates", "Ofcom", "Electoral Commission"],
      exceptions: "Breaching spending limits is a criminal offense and can void the election result."
    },
    {
      id: "vote",
      title: "Polling Day",
      duration: "Thursday",
      colorCode: "#22c55e", // Green
      description: "Voters cast a single vote for their preferred local candidate using a paper ballot and pencil (First Past the Post). Photo ID is now required.",
      stakeholders: ["Voters", "Presiding Officers", "Poll Clerks"],
      exceptions: "Voters without valid ID are turned away but can return later with ID or apply for an emergency proxy."
    },
    {
      id: "count",
      title: "The Count",
      duration: "Overnight",
      colorCode: "#a855f7", // Purple
      description: "Ballot boxes are transported to a central center. Counting happens overnight, with results declared in the early hours of Friday morning.",
      stakeholders: ["Returning Officers", "Counting Assistants", "Candidates", "Media"],
      exceptions: "In a 'dead heat' (exact tie), the Returning Officer decides the winner by lot (e.g., drawing straws)."
    },
    {
      id: "disp",
      title: "Election Petitions",
      duration: "Within 21 days",
      colorCode: "#ec4899", // Pink
      description: "Challenges to the result based on illegal practices must be made via an election petition to the High Court.",
      stakeholders: ["Election Court", "Petitioners", "Elected MPs"],
      exceptions: "If the court finds corrupt practices, the election is voided and a by-election is called."
    },
    {
      id: "trans",
      title: "Forming a Government",
      duration: "Immediate",
      colorCode: "#eab308", // Yellow
      description: "The leader of the majority party is invited by the Monarch to become Prime Minister. Transition often happens the day after the election.",
      stakeholders: ["The Monarch", "Prime Minister", "Outgoing Prime Minister"],
      exceptions: "In a 'hung parliament', the incumbent PM remains until it's clear who commands the House's confidence, often resulting in a coalition."
    }
  ]
};

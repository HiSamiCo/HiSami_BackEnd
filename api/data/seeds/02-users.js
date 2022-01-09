exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: -1,
          email: "fake@fake.com",
          password:
            "$2b$08$JkVSJh3w1DJF34RQO/chceMvPeMuAboeR3o/8T2R7nhxbICo/jja6", //password is password
          first_name: "John",
          last_name: "Doe",
        },
        {
          user_id: -2,
          email: "faker@fake.com",
          password:
            "$2b$08$JkVSJh3w1DJF34RQO/chceMvPeMuAboeR3o/8T2R7nhxbICo/jja6", //password is password
          first_name: "Brit",
          last_name: "Rocha",
          admin: true,
        },
      ]);
    });
};

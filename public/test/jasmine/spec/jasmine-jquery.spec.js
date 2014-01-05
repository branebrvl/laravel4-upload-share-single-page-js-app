xdescribe("Testing jasmine-jquery", function() {

  beforeEach(function() {
    loadFixtures('main.html');
  });

  it("should find css in piece of html code", function() {
    expect($('<div style="display: none; margin: 10px;"></div>')).toHaveCss({
      margin: "10px"
    });
  });

  it("should find fixture's #main element", function() {
    expect($('#main')).toExist();
  });

  it('should find div within loaded fixture', function() {
    expect($('#main')).toContain('div');
  });
});
